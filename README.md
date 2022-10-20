## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run dev`

Runs the Backend app in the development mode.\
Open [http://localhost:4001](http://localhost:4001) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `Frontend`
1. The frontend is build on ReactJS which includes a folder component.
2. The component folder has Controller.jsx which generates the game functionality with screen and remote controller.
3. The SocketTest.jsx ensures that Frontend established a successfull connection with Backend via WebSocket
4. The Controller.css file ensures that css for game screen and remote controller is done
5. Coming to next Folder i.e. Utils, this folder contains an index file where the ENDPOINT URL is given. We can do that in .env as well but here to show specific utilization of URL we have used that.
6. App.js contains the all components rendering in our DOM.

### `Backend`
1. There is an app.js file which contains the connectivity of node with express and socket.io.
2. Also app.js contains logics for sending and receiving the response from Frontend.
3. There is a folder routes which has the file index.js which contains the APIs which we can create. Here we have a testing route in order to confirm our BE is running.