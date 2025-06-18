# TD WebRTC LAN

This project uses TouchDesigner and WebRTC to stream one or more low-latency video feeds to any web browser on the local network.

<p float="left">
  <img src="https://github.com/user-attachments/assets/3e0db361-5700-45ab-ab73-74cf5a0cd5b0" width="1000" />


  
  <img src="https://github.com/user-attachments/assets/8ad108e8-0219-4383-b212-a4daf1ac10ce" width="200" />
  <img src="https://github.com/user-attachments/assets/0676a4bc-8d61-4118-ab31-9f56f45048a9" width="200" />
</p>

## Get the project running locally

- Clone this repository.

- You need to have installed [NodeJS](https://nodejs.org/en/): LTS Version: 18.12.1 (includes npm 8.19.2)

- Install dependecies `npm i`

- In the project cloned repository folder, use:
`npm start`

- This runs the app in the development mode.
Open [http://localhost:80](http://localhost:80) or [http://webrtc.local](http://webrtc.local) to view it in your browser.

- Ports can be assigned in the url using http://webrtc.local/?port=450

The page will reload when you make changes.


## TouchDesigner setup

- Download the zip file `TDWebRTC` in Resources.
- Open TouchDesigner file `WebRTC.toe`
- Install `pyqrcode` library to Touchdesigner
  - Click on `button2`
  - Pulse "Get the Path"
  - Go to folder path
  - In another window go to `TDWebRTC > Python Libraries` folder
  - Copy and paste `pyqrcode` to Touchdesigner python library path
- This will allow a QR code to generate with custom url to scan with your phone. This updates when you change the port in the `WebRTC` comp
  - Example: Changing to port 456 will generate a QR code that goes to `http://webrtc.local/?port=456`, once you scan it with your phone it will automatically connect on that port

### WebRTC Comp Configure
- To configure the `WebRTC` comp, select and go to `Config` tab
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
  - Example: Changing to port `456` will generate a QR code that goes to `http://webrtc.local/?port=456`, once you scan it with your phone it will automatically connect on that port
- **Show Port**
  - This displays the port number in the video feed for easy debugging

# Credit

This project is a branch of [WebRTC-Remote-Panel-Web-Demo](https://github.com/TouchDesigner/WebRTC-Remote-Panel-Web-Demo) created by jetXS and kyeshmz
