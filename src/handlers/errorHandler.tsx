import { toast, ToastPosition } from "react-toastify";

interface ErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string>;
      message?: string | Record<string, string>;
    };
  };
  request?: XMLHttpRequest;
  message: string;
}

/**
 * Determine response of handler
 * @param {string} alternateMessage
 * @param {object} data
 * @returns {string}
 */
const handlerResponse = (alternateMessage: string, data: any = {}): string => {
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
const handler = (
  errorObject: ErrorResponse,
  shouldDispatchAlert: boolean = false
): string => {
  try {
    if (errorObject.response && errorObject.response.data) {
      let errors = errorObject.response.data.errors;
      let message = errorObject.response.data.message;

      if (errors) {
        // Map through errors
        Object.values(errors).map((item) => {
          // Send found errors to alert
          return (
            shouldDispatchAlert &&
            toast.warning(item.toString(), {
              position: "top-right",
              theme: "colored",
              autoClose: 6000,
            })
          );
        });
      } else if (message && typeof message === "object") {
        // Map through messages
        Object.values(message).map((item) => {
          // Send found messages to alert
          return (
            shouldDispatchAlert &&
            toast.warning(item.toString(), {
              position: "top-right",
              theme: "colored",
              autoClose: 6000,
            })
          );
        });
      } else if (message && typeof message === "string") {
        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.warning(message, {
            position: "top-right",
            theme: "colored",
            autoClose: 6000,
          });

        // Return a response
        return handlerResponse("Something went wrong!", errorObject.response);
      } else {
        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.warning("Something went wrong! Please try again", {
            position: "top-right",
            theme: "colored",
            autoClose: 6000,
          });
      }
      // Return a response
      return handlerResponse("Something went wrong!", errorObject.response);
    } else if (errorObject.request) {
      // No network connection
      if (errorObject.message === "Network Error") {
        // Send found errors to alert
        shouldDispatchAlert &&
          toast.error("Network is Unavailable", {
            position: "top-right",
            theme: "colored",
          });
      } else {
        // Send generic error message to alert
        shouldDispatchAlert &&
          toast.error("Session has expired", {
            position: "top-right",
            theme: "colored",
          });
      }

      // Return a response
      return handlerResponse("Something went wrong!", errorObject);
    } else {
      shouldDispatchAlert &&
        toast.error(errorObject.message, {
          position: "top-right" as ToastPosition,
          theme: "colored",
        });

      // Return a response
      return handlerResponse("Something went wrong!", errorObject);
    }
  } catch (error) {
    console.log(
      "Error Handler System Failure - Error Experienced In Processing Error Object",
      error
    );
    return "Error Handler System Failure";
  }
};

export default handler;
