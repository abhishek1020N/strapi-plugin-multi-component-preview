import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from 'react-intl';

import {
  Box,
  Button,
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
  const { formatMessage } = useIntl()

  return (
    <Field hint={description && formatMessage(description)}>
       <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>{formatMessage(intlLabel)}</FieldLabel>
          <Box paddingTop={2}>
            <Button 
              onClick={() => setIsVisible((prev) => !prev)}
              hint={description && formatMessage(description)}>
              <Typography>Preview</Typography>
            </Button>
          </Box>
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
              Preview
            </Typography>
          </ModalHeader>
          <ModalBody style={{ height: "auto", maxHeight: "100vh" }}>
            <img style={{ width: "100%" }} src={imageUrl} />
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
