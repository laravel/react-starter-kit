import { useEffect, useRef } from 'react';

// react-bootstrap
import Card from 'react-bootstrap/Card';

// project-imports
import branding from '../../../../../branding.json';

// third-party
import IntroJs from 'intro.js';

// =============================|| TOUR - HELLO CARD ||============================== //

export default function HelloCardPage() {
  const step1 = useRef<HTMLDivElement | null>(null);
  const step2 = useRef<HTMLDivElement | null>(null);
  const step3 = useRef<HTMLDivElement | null>(null);
  const step4 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intro = IntroJs();
    if (step1.current && step2.current && step3.current && step4.current) {
      intro.setOptions({
        steps: [
          {
            intro: 'Hello world!'
          },
          {
            element: step1.current,
            intro: 'This is Card'
          },
          {
            element: step2.current,
            intro: 'This is the Card header'
          },
          {
            element: step3.current,
            intro: 'This is Card Title'
          },
          {
            element: step4.current,
            intro: 'This is Card Body'
          }
        ]
      });

      intro.start();
    }
  }, []);

  return (
    <Card ref={step1}>
      <Card.Header ref={step2}>
        <Card.Title ref={step3}>Hello card</Card.Title>
      </Card.Header>
      <Card.Body ref={step4}>
        <h1>H1 {branding.brandName}</h1>
        <h2>H2 {branding.brandName}</h2>
        <h3>H3 {branding.brandName}</h3>
        <h4>H4 {branding.brandName}</h4>
        <h5>H5 {branding.brandName}</h5>
        <h6>H6 {branding.brandName}</h6>
        <p>p {branding.brandName}</p>
        <strong>p {branding.brandName}</strong>
      </Card.Body>
    </Card>
  );
}
