import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import {
  Box,
  Button,
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
    console.log("dataArray:", dataArray);
    return (
      <Field hint={description && formatMessage(description)}>
        <GridItem background="primary200" padding={1} hasRadius>
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
                >
                  <CarouselImage
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
                {getFileTitle}
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
                label={getFileType}
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
        <FieldLabel>{"Block design Example"}</FieldLabel>
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
              Block design Example
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
