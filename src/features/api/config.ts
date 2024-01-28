interface Config {
    apiUrl: string;
    appName: string;
  }
  
  let localPlatforms = ["localhost"];
  
  let platform = localPlatforms.includes(window.location.hostname)
    ? "local"
    : "production";
  
  let config: Config; // Define the type of config
  
  if (platform === "local") {
    config = {
      apiUrl: process.env.REACT_APP_API_URL!,
      appName: "Quiz Deck",
    };
  } else {
    config = {
      apiUrl: process.env.REACT_APP_API_URL!,
      appName: "Quiz Deck",
    };
  }
  
  export default config;
  