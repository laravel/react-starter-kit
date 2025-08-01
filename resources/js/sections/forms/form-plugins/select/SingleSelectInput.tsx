import { useEffect, useRef } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Choices from 'choices.js';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| SELECT - SINGLE SELECT INPUT ||============================== //

export default function SingleSelectInput() {
  useEffect(() => {
    const choicesElement1 = document.getElementById('choices-single-default') as HTMLSelectElement;
    if (choicesElement1) {
      new Choices(choicesElement1).setValue(['Choice 1']);
    }
    const choicesElement2 = document.getElementById('choices-single-groups') as HTMLSelectElement;
    if (choicesElement2) {
      new Choices(choicesElement2).setValue([]);
    }

    const choicesElement3 = document.getElementById('choices-single-rtl') as HTMLSelectElement;
    if (choicesElement3) {
      new Choices(choicesElement3).setValue([]);
    }

    const choicesElement4 = document.getElementById('choices-single-no-search') as HTMLSelectElement;
    if (choicesElement4) {
      new Choices(choicesElement4).setValue([]);
    }

    const choicesElement5 = document.getElementById('choices-single-selected-option') as HTMLSelectElement;
    if (choicesElement5) {
      new Choices(choicesElement5).setValue([]);
    }

    const choicesElement6 = document.getElementById('choices-with-custom-props-via-html') as HTMLSelectElement;
    if (choicesElement6) {
      new Choices(choicesElement6).setValue([]);
    }

    const choicesElement7 = document.getElementById('choices-single-no-sorting') as HTMLSelectElement;
    if (choicesElement7) {
      new Choices(choicesElement7).setValue([]);
    }

    const choicesElement8 = document.getElementById('choices-single-custom-templates') as HTMLSelectElement;
    if (choicesElement8) {
      new Choices(choicesElement8).setValue([]);
    }

    const choicesElement9 = document.getElementById('cities') as HTMLSelectElement;
    if (choicesElement9) {
      new Choices(choicesElement9).setValue([]);
    }

    const choicesElement10 = document.getElementById('tube-stations') as HTMLSelectElement;
    if (choicesElement10) {
      new Choices(choicesElement10).setValue([]);
    }
  }, []);
  const selectFetchRef = useRef<HTMLSelectElement | null>(null);
  const selectRemoveRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (!selectFetchRef.current || !selectRemoveRef.current) return;

    // Initialize the first dropdown (Remote Fetch)
    const choicesFetch = new Choices(selectFetchRef.current, {
      searchPlaceholderValue: 'Search for an Arctic Monkeys record'
    });

    const initializeChoices = async () => {
      try {
        const response = await fetch('https://api.discogs.com/artists/391170/releases?token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW');
        const data = await response.json();

        choicesFetch.setChoices(
          data.releases.map((release: { title: string }) => ({
            label: release.title,
            value: release.title
          })),
          'value',
          'label',
          true
        );
        choicesFetch.setChoiceByValue('Fake Tales Of San Francisco');
      } catch (error) {
        console.error('Error fetching Choices data:', error);
      }
    };

    // Call the initialization function
    initializeChoices();

    const choicesRemove = new Choices(selectRemoveRef.current, {
      removeItemButton: true,
      searchPlaceholderValue: "Search for a Smiths' record"
    });

    choicesRemove.setChoices(async () => {
      try {
        const response = await fetch('https://api.discogs.com/artists/83080/releases?token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW');
        const data = await response.json();

        return data.releases.map((release: { title: string }) => ({
          label: release.title,
          value: release.title
        }));
      } catch (error) {
        console.error('Error fetching Choices data:', error);
        return [];
      }
    });

    return () => {
      choicesFetch.destroy();
      choicesRemove.destroy();
    };
  }, []);

  return (
    <MainCard title="Single select input">
      <Form>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Default
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-default">
              <option value=""> This is a placeholder set in the config</option>
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Options from remote source (Fetch API)
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-remote-fetch" ref={selectFetchRef}></Form.Control>
            <small>If the following two examples do not load, the rate limit has probably been reached. Try again later!</small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Options from remote source (Fetch API) & remove button
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control
              as="select"
              id="choices-single-remove-xhr"
              ref={selectRemoveRef}
              placeholder="This is a placeholder set in the config"
            >
              <option value="">Pick a Smiths' record</option>
            </Form.Control>
            <small>If the following two examples do not load, the rate limit has probably been reached. Try again later!</small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Option groups
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-groups">
              <option value="">This is a placeholder set in the config</option>
              <optgroup label="UK">
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Liverpool">Liverpool</option>
              </optgroup>
              <optgroup label="FR">
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
              </optgroup>
              <optgroup label="DE" disabled>
                <option value="Hamburg">Hamburg</option>
                <option value="Munich">Munich</option>
                <option value="Berlin">Berlin</option>
              </optgroup>
              <optgroup label="US">
                <option value="New York">New York</option>
                <option value="Washington" disabled>
                  Washington
                </option>
                <option value="Michigan">Michigan</option>
              </optgroup>
              <optgroup label="SP">
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Malaga">Malaga</option>
              </optgroup>
              <optgroup label="CA">
                <option value="Montreal">Montreal</option>
                <option value="Toronto">Toronto</option>
                <option value="Vancouver">Vancouver</option>
              </optgroup>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Right-to-left
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-rtl" dir="rtl">
              <option value="">This is a placeholder set in the config</option>
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Options added via config with no search
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-no-search" defaultValue="six">
              <option value="0">Zero</option>
              <option value="One">Label One</option>
              <option value="Two" disabled>
                Label Two
              </option>
              <option value="Three">Label Three</option>
              <option value="Four" disabled>
                Label Four
              </option>
              <option value="Five">Label Five</option>
              <option value="Six">Label Six</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Option and option groups added via config
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-selected-option">
              <optgroup label="Group One">
                <option value="child 1">Child One</option>
                <option value="child 3">Child Three</option>
                <option value="child 2" disabled>
                  Child Two
                </option>
              </optgroup>
              <optgroup label="Group Two">
                <option value="child 5">Five</option>
                <option value="child 4" disabled>
                  Four
                </option>
                <option value="child 6">Fix</option>
              </optgroup>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Option selected via config with custom properties
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-selected-option">
              <option>Label One</option>
              <option>Label Three</option>
              <option disabled>Label Two</option>
            </Form.Control>
            <small>Try searching for 'fantastic',"Label 3" should display</small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Option searchable by custom properties via <code>data-custom-properties</code> attribute
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-with-custom-props-via-html" defaultValue="Dropdown item 1">
              <option value="Dropdown item 1">Label One</option>
              <option value="Dropdown item 3">Label Three</option>
              <option value="Dropdown item 2" disabled>
                Label Two
              </option>
            </Form.Control>
            <small>Try searching for 'fantastic',"Label 3" should display</small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Options without sorting
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-no-sorting">
              <option value="Madrid">Madrid</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Liverpool">Liverpool</option>
              <option value="Paris">Paris</option>
              <option value="Malaga">Malaga</option>
              <option value="Washington" disabled>
                Washington
              </option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
              <option value="Hamburg">Hamburg</option>
              <option value="Munich">Munich</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Berlin">Berlin</option>
              <option value="Montreal">Montreal</option>
              <option value="New York">New York</option>
              <option value="Michigan">Michigan</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Custom templates
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="choices-single-custom-templates">
              <option value="React">🎉 React</option>
              <option value="Angular">👉🏽 Angular</option>
              <option value="Ember">👉🏽 Ember</option>
              <option value="Vue">👉🏽 Vue</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Cities
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="cities">
              <option value="">Choose a city</option>
              <option value="Leeds">Leeds</option>
              <option value="Manchester">Manchester</option>
              <option value="London">London</option>
              <option value="Sheffield">Sheffield</option>
              <option value="Newcastle">Newcastle</option>
            </Form.Control>
            <small>
              Below is an example of how you could have two select inputs depend on each other. 'Tube stations' will only be enabled if the
              value of 'Cities' is 'London'{' '}
            </small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Tube stations
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" id="tube-stations" disabled>
              <option value="">Choose a tube station</option>
              <option value="London">Moorgate</option>
              <option value="St Pauls">St Pauls</option>
              <option value="Old Street">Old Street</option>
              <option value="Liverpool Street">Liverpool Street</option>
              <option value="Kings Cross St. Pancras">Kings Cross St. Pancras</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </MainCard>
  );
}
