package ServletSample;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigReader {

    private static final String PROPERTIES_FILE = "/config.properties";

    public static String getProperty(String key) {
        Properties properties = new Properties();
        try (InputStream inputStream = ConfigReader.class.getResourceAsStream(PROPERTIES_FILE)) {
            if (inputStream == null) {
                throw new IOException("Cannot find properties file: " + PROPERTIES_FILE);
            }
            properties.load(inputStream);
            return properties.getProperty(key);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
