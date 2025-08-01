# TD WebRTC LAN

This project uses TouchDesigner and WebRTC to stream one or more low-latency video feeds to any web browser on the local network.

## [Download Now](https://github.com/jshea2/TD-WebRTC-LAN/releases)


<p float="left">
  <img src="https://github.com/user-attachments/assets/519059d1-6e12-4675-bbab-83451281ff69" width="700" />
<br>  
  <img src="https://github.com/user-attachments/assets/45ff4b84-375e-4ffb-8ca2-fc8af856f006" width="300" /> 
  <img src="https://github.com/user-attachments/assets/8ad108e8-0219-4383-b212-a4daf1ac10ce" width="200" />
  <img src="https://github.com/user-attachments/assets/0676a4bc-8d61-4118-ab31-9f56f45048a9" width="200" />
</p>

## Full Tutorial Video

[Watch Video Here](https://www.youtube.com/watch?v=pt-i3Qb-ODY)

<a href="https://www.youtube.com/watch?v=pt-i3Qb-ODY" target="_blank">
  <img src="https://img.youtube.com/vi/pt-i3Qb-ODY/maxresdefault.jpg" width="400" />
</a>



##

### Note ⚠️
Make sure you are using Touchdesigner build 2023 or 2025 (Experimental). I had issues using build 2022.

## TouchDesigner Setup

- Download the zip file `TDWebRTC_TD-Standalone` in Resources.
- Open TouchDesigner file `WebRTC.toe`
- In Touchdesigner select `WebServer`
-   Pulse `Get Network Adapter`
-   Select desired Network Adapter from the dropdown parameter below
-   Toggle On `Web Server`
- This should give you a rendered view of the webpage in the `WebServer` comp to confirm it is working
- `Restart Web Server` pulse will reload the webserver and update URLs in other comps if you select a different network 
-   Toggle Off `Web Server` will kill the web server on port 5757

### 'WebRTC' Comp Configure
- To configure the `WebRTC` comp, select and go to `Config` tab
- After starting the web server the `My URL` will dynamically update
-   You can open the webpage of that URL by pulsing `Open Webpage`
- **Reset**
  - This resets all server and client signalling nodes
- **Flip Vertical** 
  - This swaps resolution width and height for portrait/vertical orientation
- Width and Heght
  - This is the pixel resolution
- **Flip Horizontal**
  - This mirrors the image. After testing fullscreen on both desktop and mobile, mobile devices tend to flip the image, while desktop browsers do not.
- **Port**
  - This sets the port for WebRTC. 
  - Note: WebRTC is a peer-to-peer protocol, which means each connection typically uses its own signaling port. To support multiple devices, you’ll need to duplicate the `WebRTC` comp and assign a unique port to each instance.
- **Show QR Code URL**
  - This displays a dynamic QR Code in the comp that a mobile device can scan to go directly to the webpage and correct port
  - Everytime the port is updated the QR code will dynamically change 
  - Example: Changing to port `456` will generate a QR code that goes to `http://[yourIp]/?port=456`, once you scan it with your phone it will automatically connect on that port
- **Show Port**
  - This displays the port number in the video feed for easy debugging
 
### ✨ New Feature ✨ Autostart in Fullscreen

<img src="https://github.com/user-attachments/assets/d417e7b6-5910-4d43-8cb3-07aeb5e64a6a" width="700" />

- AutoStart in Fullscreen via URL query
  - Example: `http://192.168.0.1/?port=450&autostart=true`

- New Toggle Button in TouchDesigner for "Autostart in Fullscreen"
Automatically updates the URL with the correct query string so you can open the page directly with the correct settings.

- One-Click Unlock for system fullscreen and audio

  - ⚠️ Browser Limitations
    - Due to browser security policies, enabling `?autostart=true` will still require a single user interaction (click or tap) to fully activate audio and fullscreen. By default, the media starts muted and fills the browser window (not system       fullscreen). Once the user interacts (by tap or mouse click), audio un-mutes and true fullscreen is triggered.


##

## Editing this project with a code editor

- Clone this repository.

- You need to have installed [NodeJS](https://nodejs.org/en/): LTS Version: 18.12.1 (includes npm 8.19.2)

- Install dependecies `npm i`

- In the project cloned repository folder, use:
`npm start`

- This runs the app in the development mode.
Open [http://localhost:5757](http://localhost:5757) or your computers IP address (PC) to view it in your browser.

- Ports can be assigned in the url using http://[yourIp]/?port=450 (example: http://192.168.0.68/?port=450)

The page will reload when you make changes.

# Credit

This project is a branch of [WebRTC-Remote-Panel-Web-Demo](https://github.com/TouchDesigner/WebRTC-Remote-Panel-Web-Demo) created by jetXS and kyeshmz
