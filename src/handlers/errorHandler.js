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
 * Parse error response from server
 * @param {*} errorObject
 * @param {boolean} shouldDispatchAlert
 * @returns {string}
 */
const handler = (errorObject, shouldDispatchAlert = false) => {
  try {
    if (errorObject.response && errorObject.response.data) {
      let errors = errorObject?.response?.data?.errors;
      let message = errorObject?.response?.data?.message;

      if (errors) {
        // Request made and server responded with an error
        handlerDump(
          "Error Response",
          errorObject?.response?.headers,
          errorObject?.response?.data,
          errorObject?.response?.status
        );

        // Map through errors
        Object.values(errors).map((item, key) => {
          // Send found errors to alert
          return (
            shouldDispatchAlert &&
            toast.warning(item.toString(), {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
            })
          );
        });
      } else if (message && typeof message === "object") {
        // Request made and server responded with an error
        handlerDump(
          "Error Response",
          errorObject?.response?.headers,
          errorObject?.response?.data,
          errorObject?.response?.status
        );
        // Map through messages
        Object.values(message).map((item, key) => {
          // Send found messages to alert
          return (
            shouldDispatchAlert &&
            toast.warning(item.toString(), {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
            })
          );
        });
      } else if (message && typeof message === "string") {
        // Request made and server responded with an error

        handlerDump(
          "Error Response",
          errorObject?.response?.headers,
          errorObject?.response?.data,
          errorObject?.response?.status
        );

        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });

        // Return a response
        return handlerResponse("Something went wrong!", errorObject.response);
      } else {
        // Request made and server responded with an error
        handlerDump("Error Response", errorObject.response);

        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.warning("Something went wrong! Please try again", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
      }
      // Return a response
      return handlerResponse("Something went wrong!", errorObject.response);
    } else if (errorObject.request) {
      // The request was made but no response was received
      handlerDump("Unknown Response", errorObject.request);

      // No network connection
      if (errorObject.message === "Network Error") {
        // Send found errors to alert
        shouldDispatchAlert &&
          toast.error("Network is Unavailable", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
      } else {
        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.error("Session has expired", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
      }

      // Return a response
      return handlerResponse("Something went wrong!", errorObject);
    } else {
      // Something happened in setting up the request that triggered an Error
      handlerDump("Unknown Error", errorObject);
      // Send generic info message to alert
      shouldDispatchAlert &&
        toast.error("Application is Unavailable", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Something went wrong!", errorObject);
    }
  } catch (error) {
    handlerDump(
      "Error Handler System Failure - Error Experienced In Processing Error Object",
      error
    );
    handlerDump(
      "Error Handler System Failure - Error Object Passed In For Processing",
      errorObject
    );
  }
};

export default handler;
