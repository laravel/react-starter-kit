import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

// project-imports
import MainCard from '@/components/MainCard';

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all';

interface CountryOption {
  name: string;
}

// =============================|| ASYNC TYPEAHEAD ||============================== //

export default function CountrySearch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<CountryOption[]>([]);

  const handleSearch = (query: string): void => {
    if (!query) {
      setOptions([]);
      return;
    }

    setIsLoading(true);

    fetch(COUNTRIES_API_URL)
      .then((response) => response.json())
      .then((countries) => {
        const filteredCountries = countries.filter((country: any) => country.name.common.toLowerCase().includes(query.toLowerCase()));

        const formattedItems: CountryOption[] = filteredCountries.map((country: any) => ({
          name: country.name.common
        }));

        setOptions(formattedItems);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  return (
    <MainCard>
      <Form>
        <Row>
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Simple Demo</Form.Label>
          </Col>
          <Col lg={5} md={9} sm={12}>
            <AsyncTypeahead
              id="country-search"
              isLoading={isLoading}
              onSearch={handleSearch}
              options={options}
              labelKey="name"
              placeholder="States of USA"
              renderMenuItemChildren={(option: any) => <span>{option.name}</span>}
            />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
