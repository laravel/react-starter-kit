<?php
// app/Models/GuestSession.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class GuestSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'session_id',
        'name',
        'email',
        'ip_address',
        'user_agent',
        'device_type',
        'browser',
        'browser_version',
        'operating_system',
        'country',
        'country_code',
        'region',
        'city',
        'latitude',
        'longitude',
        'timezone',
        'isp',
        'session_data',
        'started_at',
        'completed_at',
        'last_activity',
    ];

    protected $casts = [
        'session_data' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'last_activity' => 'datetime',
        'latitude' => 'decimal:6',
        'longitude' => 'decimal:6',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    /**
     * Create a guest session from request data
     */
    public static function createFromRequest($request, Assessment $assessment): self
    {
        $userAgent = $request->header('User-Agent');
        $ip = $request->ip();

        // Parse user agent
        $browser = self::parseBrowser($userAgent);
        $os = self::parseOperatingSystem($userAgent);
        $deviceType = self::parseDeviceType($userAgent);

        // Get location data (you can integrate with a service like ip-api.com)
        $locationData = self::getLocationData($ip);

        return self::create([
            'assessment_id' => $assessment->id,
            'session_id' => $request->session()->getId(),
            'name' => $assessment->name,
            'email' => $assessment->email,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'device_type' => $deviceType,
            'browser' => $browser['name'] ?? null,
            'browser_version' => $browser['version'] ?? null,
            'operating_system' => $os,
            'country' => $locationData['country'] ?? null,
            'country_code' => $locationData['countryCode'] ?? null,
            'region' => $locationData['regionName'] ?? null,
            'city' => $locationData['city'] ?? null,
            'latitude' => $locationData['lat'] ?? null,
            'longitude' => $locationData['lon'] ?? null,
            'timezone' => $locationData['timezone'] ?? null,
            'isp' => $locationData['isp'] ?? null,
            'session_data' => [
                'referrer' => $request->header('Referer'),
                'language' => $request->header('Accept-Language'),
            ],
            'started_at' => now(),
            'last_activity' => now(),
        ]);
    }

    /**
     * Update last activity
     */
    public function updateActivity(): void
    {
        $this->update(['last_activity' => now()]);
    }

    /**
     * Mark session as completed
     */
    public function markCompleted(): void
    {
        $this->update(['completed_at' => now()]);
    }

    /**
     * Check if session is active (within last 30 minutes)
     */
    public function isActive(): bool
    {
        return $this->last_activity && $this->last_activity->gt(now()->subMinutes(30));
    }

    /**
     * Get session duration
     */
    public function getDuration(): ?string
    {
        if (!$this->completed_at) {
            return null;
        }

        return $this->started_at->diffForHumans($this->completed_at, true);
    }

    /**
     * Parse browser from user agent
     */
    private static function parseBrowser(string $userAgent): array
    {
        $browsers = [
            'Chrome' => '/Chrome\/([0-9.]+)/',
            'Firefox' => '/Firefox\/([0-9.]+)/',
            'Safari' => '/Safari\/([0-9.]+)/',
            'Edge' => '/Edge\/([0-9.]+)/',
            'Opera' => '/Opera\/([0-9.]+)/',
            'Internet Explorer' => '/MSIE ([0-9.]+)/',
        ];

        foreach ($browsers as $browser => $pattern) {
            if (preg_match($pattern, $userAgent, $matches)) {
                return [
                    'name' => $browser,
                    'version' => $matches[1] ?? null,
                ];
            }
        }

        return ['name' => 'Unknown', 'version' => null];
    }

    /**
     * Parse operating system from user agent
     */
    private static function parseOperatingSystem(string $userAgent): ?string
    {
        $os = [
            'Windows 11' => '/Windows NT 10.0.*rv:91/',
            'Windows 10' => '/Windows NT 10.0/',
            'Windows 8.1' => '/Windows NT 6.3/',
            'Windows 8' => '/Windows NT 6.2/',
            'Windows 7' => '/Windows NT 6.1/',
            'Mac OS X' => '/Mac OS X ([0-9_]+)/',
            'Linux' => '/Linux/',
            'Ubuntu' => '/Ubuntu/',
            'iPhone' => '/iPhone/',
            'iPad' => '/iPad/',
            'Android' => '/Android ([0-9.]+)/',
        ];

        foreach ($os as $osName => $pattern) {
            if (preg_match($pattern, $userAgent)) {
                return $osName;
            }
        }

        return 'Unknown';
    }

    /**
     * Parse device type from user agent
     */
    private static function parseDeviceType(string $userAgent): string
    {
        if (preg_match('/Mobile|Android|iPhone|iPad/', $userAgent)) {
            if (preg_match('/iPad/', $userAgent)) {
                return 'Tablet';
            }
            return 'Mobile';
        }

        return 'Desktop';
    }

    /**
     * Get location data from IP address
     */
    private static function getLocationData(string $ip): array
    {
        // Skip for local/private IPs
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            return [];
        }

        try {
            // Using ip-api.com (free for non-commercial use)
            $response = file_get_contents("http://ip-api.com/json/{$ip}");
            $data = json_decode($response, true);

            if ($data && $data['status'] === 'success') {
                return $data;
            }
        } catch (\Exception $e) {
            // Log error but don't fail
            Log::warning('Failed to get location data', ['ip' => $ip, 'error' => $e->getMessage()]);
        }

        return [];
    }
}
