// react-bootstrap
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// project-imports
import SimpleBarScroll from '@/components/third-party/SimpleBar';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import avatar3 from '@assets/images/user/avatar-3.png';
import avatar4 from '@assets/images/user/avatar-4.png';
import avatar5 from '@assets/images/user/avatar-5.png';

interface Message {
  src: string;
  name: string;
  message: string;
  status: 'active' | 'deactive';
  time?: string;
}

// user data
const messages: Message[] = [
  { src: avatar1, name: 'Alex', message: 'Cheers!', status: 'active' },
  { src: avatar2, name: 'John Doue', message: 'Stay hungry!', status: 'active' },
  { src: avatar3, name: 'Alex', message: 'Cheers!', status: 'deactive', time: '30 min' },
  { src: avatar4, name: 'John Doue', message: 'Cheers!', status: 'deactive', time: '10 min' },
  { src: avatar5, name: 'Shirley Hoe', message: 'Stay hungry!', status: 'active' },
  { src: avatar1, name: 'John Doue', message: 'Cheers!', status: 'active' },
  { src: avatar2, name: 'Jon Alex', message: 'Stay hungry!', status: 'active' },
  { src: avatar3, name: 'John Doue', message: 'Cheers!', status: 'deactive', time: '10 min ago' }
];

// ==============================|| SOCIAL PROFILE - MESSAGE LIST ||============================== //

export default function MessageList() {
  return (
    <Card className="new-cust-card">
      <Card.Header>
        <h5 className="mb-0">Message</h5>
      </Card.Header>
      <SimpleBarScroll style={{ maxHeight: '415px' }}>
        <Card.Body className="pb-0">
          {messages.map((msg, index) => (
            <Stack key={index} direction="horizontal" className="align-items-center mb-3">
              <Image src={msg.src} alt="user" roundedCircle className="me-3" width={50} height={50} />
              <div>
                <a className="text-decoration-none">
                  <h6 className="mb-1">{msg.name}</h6>
                </a>
                <p className="mb-1">{msg.message}</p>
                <span className={`status ${msg.status}`}>{msg.time || ''}</span>
              </div>
            </Stack>
          ))}
        </Card.Body>
      </SimpleBarScroll>
    </Card>
  );
}
