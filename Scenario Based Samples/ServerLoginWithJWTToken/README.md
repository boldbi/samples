# Bold BI Server Login With JWT Token

This project was created using a Java Servlet sample. The application aims to demonstrate how to render Bold BI server with JWT Authentication.

## Java Servlet Sample View

![image](https://github.com/boldbi/samples/assets/91586758/55b3bf0f-2149-4078-9d6c-4b6007564c04)

## Requirements/Prerequisites

* [Eclipse IDE](https://www.eclipse.org/downloads/)
* [Tomcat server](https://tomcat.apache.org/)

### Supported browsers
  
* Google Chrome, Microsoft Edge, Mozilla Firefox.

## Configuration

* Please configure the `JWT Authentication` in your `UMS Administration` page based on your Client Application's Login and Logout URL. (ex: <http://localhost:50000/ums/administration>)
* To do this, navigate to the `UMS Site Settings` page on the Bold BI Server. From there, choose `Authentication` and click on the `JWT` tab.  Enable the `Enable JWT`. Once enabled, you will need to update the required login URL. For more information, please refer to the following image or detailed [instructions](https://help.boldbi.com/multi-tenancy/site-administration/authentication/json-web-token/#steps-to-configure-jwt-in-bold-bi?utm_source=github&utm_medium=backlinks) on how to enable it.

    ![JWT Authentication](https://github.com/boldbi/samples/assets/91586758/a266074c-880f-4e8f-9c26-bb80a8e8fa31)

* Provide the following details in the `JWT`.  As the Java Servlet application base URL is localhost, we are setting the `Remote Login URL` and `Remote Logout URL` as below and `Save` the changes.

![JWT Authentication](https://github.com/boldbi/samples/assets/91586758/02952334-17eb-466f-9b24-ee6fca3f36f3)

* Copy the `Signing Key` from the below JWT Authentication page and paste it into the `signingkey` value in the `config.properties` file in Java Servlet Sample.

    ![JWT Authentication](https://github.com/boldbi/samples/assets/91586758/329432e2-77b6-4351-a00e-1cd1be9306e7)

    ![Config.Properties](https://github.com/boldbi/samples/assets/91586758/9639e5ad-7ed0-44e1-a3f6-bdf3b936fb3f)

> **NOTE:** In the application, update the `boldbiserverurl` value in the `config.properties` file to the URL of our Bold BI server. Additionally, modify the fields for `user email`, `first name`, and `last name` values in the `config.properties` file accordingly. Use mock values for `userid` and `phone number` fields.

* Once JWT authentication is properly working, clicking the `Enable Default Authentication` button means there is no need to input any details again. To do so, open the `UMS Site Settings` page in Bold BI Server.  In `Authentication` section, select the `General` tab and enable `Enable Default Authentication` by selecting `JWT SSO` option in the `Default Authentication Provider` dropdown and `Save` the changes.

    ![Default Authentication](https://github.com/boldbi/samples/assets/129487075/a81894ac-c147-41df-8c97-ed9928d16953)

### Run a Sample Using Eclipse

* Open the folder `ServerLoginWithJWTToken` in Eclipse.

* To run the servlet, we need a server. We can use `Tomcat server`. You can download the latest version of Tomcat from <https://tomcat.apache.org/>. Once Eclipse is installed and configured with the Tomcat server.
  
  * To run the application, open the `index.jsp` file. Right-click on the `index.jsp` file. Click on `Run as` and then click on `Run as server`, after Tomcat window will open.

    ![index.jsp](https://github.com/boldbi/samples/assets/91586758/a9727ee5-a5e4-4607-b9f5-20ced14e55a6)

  * Click on `Start` in the Tomcat, then click on the `Next` button. Choose the project name and click on `Finish`.

    ![Tomcat Image](https://github.com/boldbi/samples/assets/91586758/005f1bb7-c6b8-4845-9b24-539d9078ca34)

    ![Project Image](https://github.com/boldbi/samples/assets/91586758/bf862e53-f126-4050-96fe-92b931a56047)

  * The project is now rendering. Please refer to the screenshot below.

    ![index.jsp](https://github.com/boldbi/samples/assets/91586758/55b3bf0f-2149-4078-9d6c-4b6007564c04)

  * After the project is rendered, proceed to the Bold BI Server login page. Please refer to the screenshot below. A user logging in with a JWT token must exist on the Bold BI server. Once the `Enable Default Authentication` is enabled, you can directly access the `JWT authentication` and be able to see the dashboard listing page based on the JWT token.

    ![image](https://github.com/boldbi/samples/assets/91586758/446864b6-0e95-4ce1-bd5e-777be6f6439b)

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed?utm_source=github&utm_medium=backlinks).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedding-options/iframe-embedding/?utm_source=github&utm_medium=backlinks).
