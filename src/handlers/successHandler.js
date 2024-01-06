import { toast } from "react-toastify";

/**
 * Check environment before console logging data
 * @param  {...any} data
 * @param {string} environment
 * @returns {boolean}
 */
const handlerDump = (...data) => {
  if (process.env.REACT_APP_APP_ENV === "development") {
    console.log(...data);
    return true;
  }
  return false;
};

/**
 * Determine response of handler
 * @param {string} alternateMessage
 * @param {object} data
 * @returns {string}
 */
const handlerResponse = (alternateMessage, data = {}) => {
  if (data.data && data.data.message) {
    return data.data.message;
  }
  return alternateMessage;
};

/**
 * Parse success response from server
 * @param {*} successObject
 * @param {boolean} shouldDispatchAlert
 * @returns {string}
 */
const handler = (successObject, shouldDispatchAlert = false) => {
  try {
    if (successObject.data) {
      if (successObject.data.message) {
        // Request made and server responded with a success
        handlerDump(
          "Success Response",
          successObject.headers,
          successObject.data,
          successObject.status
        );

        // Send found success message to alert
        shouldDispatchAlert &&
          toast.success(successObject?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
      } else {
        // Request made and server responded with a success
        handlerDump(
          "Success Response",
          successObject.headers,
          successObject.data,
          successObject.status
        );

        // Send generic success message to alert
        shouldDispatchAlert &&
          toast.success("Success", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
      }

      // Return a response
      return handlerResponse("Request was successful!", successObject);
    } else if (successObject.message) {
      // Request made and server responded with a success
      handlerDump(
        "Success Response",
        successObject.headers,
        successObject.status
      );

      // Send found success message to alert
      shouldDispatchAlert &&
        toast.success(successObject?.message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Request was successful!", successObject);
    } else {
      // Something happened in setting up the request that triggered an unstructured response
      handlerDump("Unknown Success Response", successObject);

      // Send generic info message to alert
      shouldDispatchAlert &&
        toast.info("Application is Unavailable", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Try again", successObject);
    }
  } catch (error) {
    handlerDump(
      "Success Handler System Failure - Error Experienced In Processing Success Object",
      error
    );
    handlerDump(
      "Success Handler System Failure - Success Object Passed In For Processing",
      successObject
    );
  }
};

export default handler;
