const parseEnv = () => {
    const envVars = Object.entries(process.env);
    const rssVars = envVars
      .filter(([key]) => key.startsWith('RSS_'))
      .map(([key, value]) => `${key}=${value}`);
  
    console.log(rssVars.join('; '));
  };
  
  parseEnv();
  