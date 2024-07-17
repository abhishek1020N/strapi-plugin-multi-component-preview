import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import styled from "styled-components";
import {
  Box,
  Card,
  CardAction,
  CardAsset,
  CarouselInput,
  CarouselImage,
  CarouselSlide,
  GridItem,
  Typography,
  ModalLayout,
  ModalBody,
  ModalHeader,
  FieldLabel,
  FieldHint,
  Field,
  CardBody,
  CardContent,
  CardSubtitle,
  CardTitle,
  Flex,
} from "@strapi/design-system";

const preview = ({
  //All these parameters are passed from admin\src\index.js
  intlLabel,
  description,
  attribute,
}) => {
  const imageUrl =
    process.env.STRAPI_ADMIN_BACKEND_URL + "/" + attribute.options.url;
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSlider, setIsVisibleSlider] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const [getFileType, setFileType] = useState("");
  const [getFileTitle, setFileTitle] = useState("");
  const { formatMessage } = useIntl();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((current) => (current < 2 ? current + 1 : 0));
  };

  const handlePrevious = () => {
    setSelectedIndex((current) => (current > 0 ? current - 1 : 2));
  };
  if (attribute.options?.data && JSON.parse(attribute.options?.data)?.length) {
    const dataArray = JSON.parse(attribute.options?.data);
    // console.log("dataArray:", dataArray);
    return (
      <Field hint={description && formatMessage(description)}>
        <GridItem
          background="primary200"
          padding={1}
          hasRadius
          style={{ width: "50%", height: "20vh" }}
        >
          <CarouselInput
            label={`Preview Blocks - (${selectedIndex + 1}/${
              dataArray?.length
            })`}
            selectedSlide={selectedIndex}
            previousLabel="Previous slide"
            nextLabel="Next slide"
            onNext={handleNext}
            onPrevious={handlePrevious}
          >
            {dataArray?.map((file, index) => {
              const fileUrlImg =
                process.env.STRAPI_ADMIN_BACKEND_URL + "/" + file.url;
              return (
                <CarouselSlide
                  key={file?.id}
                  label={`${index + 1} of ${dataArray?.length} slides`}
                  style={{ height: "15vh" }}
                >
                  <CardContainer
                    role="button"
                    tabIndex={-1}
                    style={{ alignItems: "centre" }}
                  >
                    <CardBody>
                      <CardContent>
                        <Box>
                          <CardTitle as="h3">{file?.description}</CardTitle>
                        </Box>
                        <CarouselImage
                          style={{ height: "10vh" }}
                          label={`${file?.description} - ${file?.type}`}
                          src={fileUrlImg}
                          alt={file?.type}
                          onClick={() => {
                            setIsVisibleSlider((prev) => !prev);
                            setFileURL(fileUrlImg);
                            setFileType(`${file?.type}`);
                            setFileTitle(`${file?.description}`);
                          }}
                        />
                        <CardSubtitle>{file?.type}</CardSubtitle>
                      </CardContent>
                    </CardBody>
                  </CardContainer>
                </CarouselSlide>
              );
            })}
          </CarouselInput>
        </GridItem>
        {isVisibleSlider && (
          <ModalLayout
            onClose={() => setIsVisibleSlider((prev) => !prev)}
            labelledBy="title"
          >
            <ModalHeader>
              <Typography
                fontWeight="bold"
                textColor="neutral800"
                as="h2"
                id="title"
              >
                {getFileType}
              </Typography>
            </ModalHeader>
            <ModalBody
              style={{
                // height: "85vh",
                // maxheight: "85vh !important",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CarouselInput
                label={getFileTitle}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CarouselImage src={fileURL} style={{ width: "70%" }} />
              </CarouselInput>
            </ModalBody>
          </ModalLayout>
        )}
      </Field>
    );
  }
  return (
    <Field hint={description && formatMessage(description)}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>{intlLabel}</FieldLabel>
        <div style={{ width: 100, height: 100, cursor: "pointer" }}>
          <CarouselInput>
            <CarouselImage
              src={imageUrl}
              onClick={() => setIsVisible((prev) => !prev)}
            />
          </CarouselInput>
        </div>
        <FieldHint />
      </Flex>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {intlLabel}
            </Typography>
          </ModalHeader>
          <ModalBody
            style={{
              height: "85vh",
              maxheight: "85vh !important",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CarouselInput
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CarouselImage src={imageUrl} style={{ width: "70%" }} />
            </CarouselInput>
          </ModalBody>
        </ModalLayout>
      )}
    </Field>
  );
};

//default value if no value is given

preview.defaultProps = {
  description: null,
};

// validation
preview.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  attribute: PropTypes.object.isRequired,
  description: PropTypes.object,
};

export default preview;
const Extension = styled.span`
  text-transform: uppercase;
`;

const CardActionsContainer = styled(CardAction)`
  opacity: 0;

  &:focus-within {
    opacity: 1;
  }
`;

const CardContainer = styled(Card)`
  cursor: pointer;

  &:hover {
    ${CardActionsContainer} {
      opacity: 1;
    }
  }
`;
