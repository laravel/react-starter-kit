<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ToolRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_id',
        'tool_id',
        'name',
        'email',
        'organization',
        'message',
        'status',
        'quotation_sent_at',
    ];

    protected $casts = [
        'quotation_sent_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }


    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

}
