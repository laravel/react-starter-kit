import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import { Rating } from 'react-simple-star-rating';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| RATING ||============================== //

export default function RatingMain() {
  const [showStars, setShowStars] = useState<boolean>(true);
  const [ratingPrebuilt, setRatingPrebuilt] = useState<number>();
  const [leftToRight, setLeftToRight] = useState<number>();
  const [heart, setHeart] = useState<number>();
  const [rightToLeft, setRightToLeft] = useState<number>();
  const [hideTooltip, setHideTooltip] = useState<number>();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [squareRating, setSquareRating] = useState<number | null>(null);
  const [hideTooltipRating, setHideTooltipRating] = useState<number | null>(null);

  const resetForm = () => {
    setShowStars(true);
    setRatingPrebuilt(0);
    setLeftToRight(0);
    setHeart(0);
    setRightToLeft(0);
    setHideTooltip(0);
  };
  const toggleRating = () => {
    setShowStars((prevShowStars) => !prevShowStars);
  };

  const handleRatingClick = (index: number) => {
    setSelectedRating(index);
  };
  const handleSquareRatingClick = (index: number) => {
    setSquareRating(index);
  };
  const handleHideTooltipRatingClick = (index: number) => {
    setHideTooltipRating(index);
  };

  return (
    <MainCard title="Rating">
      <Form>
        <Row className="mb-3 align-items-center">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Prebuilt</Form.Label>
          </Col>
          <Col lg={9} sm={12}>
            <div>
              {showStars ? (
                <Rating
                  customIcons={[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="wid-35 svg1 rating-smile"
                          onClick={() => handleRatingClick(0)}
                        >
                          <circle
                            fill={selectedRating !== null && selectedRating >= 0 ? '#ffa98d' : '#DCDCE6'}
                            cx="12"
                            cy="12"
                            r="10"
                            className="gl-star-1"
                          />
                          <path d="M12 14.6c1.48 0 2.9.38 4.15 1.1a.8.8 0 01-.79 1.39 6.76 6.76 0 00-6.72 0 .8.8 0 11-.8-1.4A8.36 8.36 0 0112 14.6zm4.6-6.25a1.62 1.62 0 01.58 1.51 1.6 1.6 0 11-2.92-1.13c.2-.04.25-.05.45-.08.21-.04.76-.11 1.12-.18.37-.07.46-.08.77-.12zm-9.2 0c.31.04.4.05.77.12.36.07.9.14 1.12.18.2.03.24.04.45.08a1.6 1.6 0 11-2.34-.38z"></path>
                        </svg>
                      )
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="wid-35 svg2"
                          onClick={() => handleRatingClick(1)}
                        >
                          <circle fill={selectedRating !== null && selectedRating >= 1 ? '#FFC385' : '#DCDCE6'} cx="12" cy="12" r="10" />
                          <path
                            fill="#393939"
                            d="M12 14.8c1.48 0 3.08.28 3.97.75a.8.8 0 11-.74 1.41A8.28 8.28 0 0012 16.4a9.7 9.7 0 00-3.33.61.8.8 0 11-.54-1.5c1.35-.48 2.56-.71 3.87-.71zM15.7 8c.25.31.28.34.51.64.24.3.25.3.43.52.18.23.27.33.56.7A1.6 1.6 0 1115.7 8zM8.32 8a1.6 1.6 0 011.21 2.73 1.6 1.6 0 01-2.7-.87c.28-.37.37-.47.55-.7.18-.22.2-.23.43-.52.23-.3.26-.33.51-.64z"
                          ></path>
                        </svg>
                      )
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="wid-35 svg3"
                          onClick={() => handleRatingClick(2)}
                        >
                          <circle fill={selectedRating !== null && selectedRating >= 2 ? '#FFD885' : '#DCDCE6'} cx="12" cy="12" r="10" />
                          <path
                            fill="#393939"
                            d="M15.33 15.2a.8.8 0 01.7.66.85.85 0 01-.68.94h-6.2c-.24 0-.67-.26-.76-.7-.1-.38.17-.81.6-.9zm.35-7.2a1.6 1.6 0 011.5 1.86A1.6 1.6 0 1115.68 8zM8.32 8a1.6 1.6 0 011.21 2.73A1.6 1.6 0 118.33 8z"
                          ></path>
                        </svg>
                      )
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="wid-35 svg3"
                          onClick={() => handleRatingClick(3)}
                        >
                          <circle fill={selectedRating !== null && selectedRating >= 3 ? '#FFD885' : '#DCDCE6'} cx="12" cy="12" r="10" />
                          <path
                            fill="#393939"
                            d="M15.45 15.06a.8.8 0 11.8 1.38 8.36 8.36 0 01-8.5 0 .8.8 0 11.8-1.38 6.76 6.76 0 006.9 0zM15.68 8a1.6 1.6 0 011.5 1.86A1.6 1.6 0 1115.68 8zM8.32 8a1.6 1.6 0 011.21 2.73A1.6 1.6 0 118.33 8z"
                          ></path>
                        </svg>
                      )
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="wid-35 svg3"
                          onClick={() => handleRatingClick(4)}
                        >
                          <circle fill={selectedRating !== null && selectedRating >= 4 ? '#FFD885' : '#DCDCE6'} cx="12" cy="12" r="10" />
                          <path
                            fill="#393939"
                            d="M16.8 14.4c.32 0 .59.2.72.45.12.25.11.56-.08.82a6.78 6.78 0 01-10.88 0 .78.78 0 01-.05-.87c.14-.23.37-.4.7-.4zM15.67 8a1.6 1.6 0 011.5 1.86A1.6 1.6 0 1115.68 8zM8.32 8a1.6 1.6 0 011.21 2.73A1.6 1.6 0 118.33 8z"
                          ></path>
                        </svg>
                      )
                    }
                  ]}
                  tooltipDefaultText="Select a rating"
                  tooltipArray={['1 star', '2 star', '3 star', '4 star', '5 star']}
                  showTooltip
                  onClick={function noRefCheck() {}}
                  initialValue={ratingPrebuilt}
                />
              ) : (
                <select value={ratingPrebuilt} onChange={(e) => setRatingPrebuilt(Number(e.target.value))}>
                  <option>Select a rating</option>
                  <option value="5">5 star</option>
                  <option value="4">4 star</option>
                  <option value="3">3 star</option>
                  <option value="2">2 star</option>
                  <option value="1">1 star</option>
                </select>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Left to Right</Form.Label>
          </Col>
          <Col lg={9} sm={12}>
            <div>
              {showStars ? (
                <Rating
                  customIcons={[
                    ...[0, 1, 2, 3, 4].map((index) => ({
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={squareRating !== null && squareRating >= index ? '#fdd835' : '#DCDCE6'}
                          className="wid-35 star-square"
                          onClick={() => handleSquareRatingClick(index)}
                        >
                          <rect className="gl-star-full" width="19" height="19" x="2.5" y="2.5" />
                          <polygon
                            fill="#FFF"
                            points="12 5.375 13.646 10.417 19 10.417 14.665 13.556 16.313 18.625 11.995 15.476 7.688 18.583 9.333 13.542 5 10.417 10.354 10.417"
                          />
                        </svg>
                      )
                    }))
                  ]}
                  tooltipDefaultText="Select a rating"
                  tooltipArray={['Fantastic', 'Great', 'Good', 'Poor', 'Terrible']}
                  showTooltip
                  initialValue={leftToRight}
                />
              ) : (
                <select value={leftToRight} onChange={(e) => setLeftToRight(Number(e.target.value))}>
                  <option>Select a rating</option>
                  <option value="1">Fantastic</option>
                  <option value="2">Great</option>
                  <option value="3">Good</option>
                  <option value="4">Poor</option>
                  <option value="5">Terrible</option>
                </select>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Heart</Form.Label>
          </Col>
          <Col lg={9} sm={12}>
            <div>
              {showStars ? (
                <Rating
                  emptyIcon={<i className="ti ti-heart  f-36" />}
                  fillIcon={<i className="ti ti-heart-filled text-danger f-36" />}
                  tooltipDefaultText="Select a rating"
                  tooltipArray={['1', '2', '3', '4', '5']}
                  showTooltip
                  initialValue={heart}
                />
              ) : (
                <select value={heart} onChange={(e) => setHeart(Number(e.target.value))}>
                  <option>Select a rating</option>
                  <option value="1">Fantastic</option>
                  <option value="2">Great</option>
                  <option value="3">Good</option>
                  <option value="4">Poor</option>
                  <option value="5">Terrible</option>
                </select>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Right to Left</Form.Label>
          </Col>
          <Col lg={9} sm={12} dir="rtl">
            <div>
              {showStars ? (
                <div>
                  <Rating
                    onClick={function noRefCheck() {}}
                    rtl
                    emptyIcon={<i className="ti ti-star text-warning f-36" />}
                    fillIcon={<i className="ti ti-star-filled text-warning f-36" />}
                    showTooltip
                    tooltipArray={['Terrible', 'Poor', 'Good', 'Great', 'Fantastic']}
                    tooltipDefaultText="Select a Rating"
                  />
                </div>
              ) : (
                <select value={rightToLeft} onChange={(e) => setRightToLeft(Number(e.target.value))}>
                  <option>Select a rating</option>
                  <option value="1">Fantastic</option>
                  <option value="2">Great</option>
                  <option value="3">Good</option>
                  <option value="4">Poor</option>
                  <option value="5">Terrible</option>
                </select>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Hide tooltip</Form.Label>
          </Col>
          <Col lg={9} sm={12}>
            <div>
              {showStars ? (
                <div>
                  <Rating
                    iconsCount={10}
                    customIcons={[
                      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => ({
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={hideTooltipRating !== null && hideTooltipRating >= index ? '#fdd835' : '#DCDCE6'}
                            className="wid-35 star-square"
                            onClick={() => handleHideTooltipRatingClick(index)}
                          >
                            <rect className="gl-star-full" width="19" height="19" x="2.5" y="2.5" />
                            <polygon
                              fill="#FFF"
                              points="12 5.375 13.646 10.417 19 10.417 14.665 13.556 16.313 18.625 11.995 15.476 7.688 18.583 9.333 13.542 5 10.417 10.354 10.417"
                            />
                          </svg>
                        )
                      }))
                    ]}
                  />
                  <label className="d-block">
                    Using the "data-options" attribute to hide the tooltip and prevent the control from being cleared
                  </label>
                </div>
              ) : (
                <select value={hideTooltip} onChange={(e) => setHideTooltip(Number(e.target.value))}>
                  <option>Select a rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5" selected>
                    5
                  </option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              )}
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col lg={3} sm={12}></Col>
          <Col lg={9} sm={12}>
            <Stack direction="horizontal" gap={1}>
              <Button onClick={toggleRating}>Toggle Star Rating</Button>
              <Button variant="secondary" onClick={resetForm}>
                Reset form
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
