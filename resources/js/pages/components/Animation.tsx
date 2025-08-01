import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';
import ReferenceHeader from '@/components/ReferenceHeader';

// assets
import CardImg1 from '@assets/images/light-box/l3.jpg';

// ==============================|| ANIMATION ||============================== //

export default function AnimationPage() {
  const [animation, setAnimation] = useState<string>('bounce');

  const handleAnimationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAnimation(event.target.value);
  };

  const triggerAnimation = () => {
    const imgElement = document.querySelector('.animation-image img') as HTMLImageElement;
    if (imgElement) {
      imgElement.classList.add('animate__animated', `animate__${animation}`);
      imgElement.addEventListener('animationend', () => {
        imgElement.classList.remove('animate__animated', `animate__${animation}`);
      });
    }
  };

  return (
    <>
      <AppLayout>
        <Head title="Animations" />
        <ReferenceHeader
          caption="Animate.css is a library of ready-to-use, cross-browser animations for use in your web projects."
          link="https://animate.style/"
        />
        <MainCard title="Animation">
          <Form className="animation-type">
            <Container>
              <Row className="align-items-center mb-3 g-3 justify-content-center">
                <Col lg={4} md={12}>
                  <Form.Select className="select-animations" value={animation} onChange={handleAnimationChange}>
                    <optgroup label="Attention Seekers">
                      <option value="bounce">bounce</option>
                      <option value="flash">flash</option>
                      <option value="pulse">pulse</option>
                      <option value="rubberBand">rubberBand</option>
                      <option value="shake">shake</option>
                      <option value="swing">swing</option>
                      <option value="tada">tada</option>
                      <option value="wobble">wobble</option>
                      <option value="jello">jello</option>
                    </optgroup>
                    <optgroup label="Bouncing Entrances">
                      <option value="bounceIn">bounceIn</option>
                      <option value="bounceInDown">bounceInDown</option>
                      <option value="bounceInLeft">bounceInLeft</option>
                      <option value="bounceInRight">bounceInRight</option>
                      <option value="bounceInUp">bounceInUp</option>
                    </optgroup>
                    <optgroup label="Bouncing Exits">
                      <option value="bounceOut">bounceOut</option>
                      <option value="bounceOutDown">bounceOutDown</option>
                      <option value="bounceOutLeft">bounceOutLeft</option>
                      <option value="bounceOutRight">bounceOutRight</option>
                      <option value="bounceOutUp">bounceOutUp</option>
                    </optgroup>
                    <optgroup label="Fading Entrances">
                      <option value="fadeIn">fadeIn</option>
                      <option value="fadeInDown">fadeInDown</option>
                      <option value="fadeInDownBig">fadeInDownBig</option>
                      <option value="fadeInLeft">fadeInLeft</option>
                      <option value="fadeInLeftBig">fadeInLeftBig</option>
                      <option value="fadeInRight">fadeInRight</option>
                      <option value="fadeInRightBig">fadeInRightBig</option>
                      <option value="fadeInUp">fadeInUp</option>
                      <option value="fadeInUpBig">fadeInUpBig</option>
                    </optgroup>
                    <optgroup label="Fading Exits">
                      <option value="fadeOut">fadeOut</option>
                      <option value="fadeOutDown">fadeOutDown</option>
                      <option value="fadeOutDownBig">fadeOutDownBig</option>
                      <option value="fadeOutLeft">fadeOutLeft</option>
                      <option value="fadeOutLeftBig">fadeOutLeftBig</option>
                      <option value="fadeOutRight">fadeOutRight</option>
                      <option value="fadeOutRightBig">fadeOutRightBig</option>
                      <option value="fadeOutUp">fadeOutUp</option>
                      <option value="fadeOutUpBig">fadeOutUpBig</option>
                    </optgroup>
                    <optgroup label="Flippers">
                      <option value="flip">flip</option>
                      <option value="flipInX">flipInX</option>
                      <option value="flipInY">flipInY</option>
                      <option value="flipOutX">flipOutX</option>
                      <option value="flipOutY">flipOutY</option>
                    </optgroup>
                    <optgroup label="Lightspeed">
                      <option value="lightSpeedIn">lightSpeedIn</option>
                      <option value="lightSpeedOut">lightSpeedOut</option>
                    </optgroup>
                    <optgroup label="Rotating Entrances">
                      <option value="rotateIn">rotateIn</option>
                      <option value="rotateInDownLeft">rotateInDownLeft</option>
                      <option value="rotateInDownRight">rotateInDownRight</option>
                      <option value="rotateInUpLeft">rotateInUpLeft</option>
                      <option value="rotateInUpRight">rotateInUpRight</option>
                    </optgroup>
                    <optgroup label="Rotating Exits">
                      <option value="rotateOut">rotateOut</option>
                      <option value="rotateOutDownLeft">rotateOutDownLeft</option>
                      <option value="rotateOutDownRight">rotateOutDownRight</option>
                      <option value="rotateOutUpLeft">rotateOutUpLeft</option>
                      <option value="rotateOutUpRight">rotateOutUpRight</option>
                    </optgroup>
                    <optgroup label="Sliding Entrances">
                      <option value="slideInUp">slideInUp</option>
                      <option value="slideInDown">slideInDown</option>
                      <option value="slideInLeft">slideInLeft</option>
                      <option value="slideInRight">slideInRight</option>
                    </optgroup>
                    <optgroup label="Sliding Exits">
                      <option value="slideOutUp">slideOutUp</option>
                      <option value="slideOutDown">slideOutDown</option>
                      <option value="slideOutLeft">slideOutLeft</option>
                      <option value="slideOutRight">slideOutRight</option>
                    </optgroup>
                    <optgroup label="Zoom Entrances">
                      <option value="zoomIn">zoomIn</option>
                      <option value="zoomInDown">zoomInDown</option>
                      <option value="zoomInLeft">zoomInLeft</option>
                      <option value="zoomInRight">zoomInRight</option>
                      <option value="zoomInUp">zoomInUp</option>
                    </optgroup>
                    <optgroup label="Zoom Exits">
                      <option value="zoomOut">zoomOut</option>
                      <option value="zoomOutDown">zoomOutDown</option>
                      <option value="zoomOutLeft">zoomOutLeft</option>
                      <option value="zoomOutRight">zoomOutRight</option>
                      <option value="zoomOutUp">zoomOutUp</option>
                    </optgroup>
                    <optgroup label="Specials">
                      <option value="hinge">hinge</option>
                      <option value="rollIn">rollIn</option>
                      <option value="rollOut">rollOut</option>
                    </optgroup>
                  </Form.Select>
                </Col>
                {/* Animate Button */}
                <Col lg={2} md={12}>
                  <Button className="triggerAnimation" onClick={triggerAnimation}>
                    Animate me!
                  </Button>
                </Col>
              </Row>

              {/* Animation Image */}
              <Row className="align-items-center justify-content-center">
                <Col lg={6} sm={8}>
                  <div className={`text-center animation-image animate__animated animate__${animation}`}>
                    <Image className="img-fluid img-thumbnail" src={CardImg1} alt="animate images" />
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        </MainCard>
      </AppLayout>
    </>
  );
}
