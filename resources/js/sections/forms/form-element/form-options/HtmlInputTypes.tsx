import { ChangeEvent, useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| FORM OPTIONS - HTML INPUT TYPES ||============================== //

export default function HTMLInputTypes() {
  const [inputText, setInputText] = useState('john Doe');
  const [numberValue, setNumberValue] = useState(100);
  const [telValue, setTelValue] = useState('+918888888888');
  const [emailValue, setEmailValue] = useState('demo@example.com');
  const [passwordValue, setPasswordValue] = useState('Password');
  const [dateTime, setDateTime] = useState('2021-12-31T04:03:20');
  const [date, setDate] = useState('2021-12-31');
  const [time, setTime] = useState('04:03:20');
  const [month, setMonth] = useState('2021-12');
  const [week, setWeek] = useState('2021-W41');
  const [color, setColor] = useState('#5052FC');
  const [range, setRange] = useState(25);
  const [search, setSearch] = useState('Best Admin Template');
  const [url, setUrl] = useState('https://validator.w3.org/');

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value);
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => setNumberValue(parseInt(e.target.value));
  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => setTelValue(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value);
  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => setDateTime(e.target.value);
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value);
  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => setMonth(e.target.value);
  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => setWeek(e.target.value);
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value);
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => setRange(parseInt(e.target.value));
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  return (
    <MainCard title="HTML Input Types">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">
            Here are the different input types you can use in HTML. Check more at{' '}
            <a href="https://www.w3schools.com/html/html_form_input_types.asp" target="_blank" rel="noopener noreferrer">
              W3Schools
            </a>
          </div>
        </Stack>
      </Alert>

      <div className="mb-3">
        <Form.Label>Simple Input Text</Form.Label>
        <Form.Control type="text" value={inputText} onChange={handleInputTextChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Number</Form.Label>
        <Form.Control type="number" value={numberValue} onChange={handleNumberChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Telephone</Form.Label>
        <Form.Control type="tel" value={telValue} onChange={handleTelChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={emailValue} onChange={handleEmailChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={passwordValue} onChange={handlePasswordChange} />
      </div>

      <div className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control type="file" />
      </div>

      <div className="mb-3">
        <Form.Label>Multi Files</Form.Label>
        <Form.Control type="file" multiple />
        <small>Try selecting more than one file when browsing for files.</small>
      </div>

      <div className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control type="url" value={url} onChange={handleUrlChange} />
      </div>
      <div className="mb-3">
        <Form.Label>Search</Form.Label>
        <Form.Control type="search" value={search} onChange={handleSearchChange} />
        <small>a search field behaves like a regular text field</small>
      </div>

      <div className="mb-3">
        <Form.Label>Date Time Local</Form.Label>
        <Form.Control type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Date only</Form.Label>
        <Form.Control type="date" value={date} onChange={handleDateChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Time only</Form.Label>
        <Form.Control type="time" value={time} onChange={handleTimeChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Month only</Form.Label>
        <Form.Control type="month" value={month} onChange={handleMonthChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Week only</Form.Label>
        <Form.Control type="week" value={week} onChange={handleWeekChange} />
      </div>

      <div className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Control type="color" value={color} onChange={handleColorChange} className="w-100" />
      </div>

      <div className="mb-4">
        <Form.Label>Range</Form.Label>
        <Form.Range value={range} min={0} max={50} onChange={handleRangeChange} />
      </div>

      <Stack direction="horizontal" gap={2} className="pt-4">
        <Button>Submit</Button>
        <Button variant="danger">Cancel</Button>
      </Stack>
    </MainCard>
  );
}
