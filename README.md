# SysOS System Information

SysOS is a lightweight and intuitive system information tool designed to provide users with detailed insights into their computer's hardware and software. From CPU usage and memory statistics to GPU details and storage information, SysOS offers a comprehensive overview of your system's performance and configuration.

## Installation

### Prerequisites

Before installing, make sure you have the following installed:
- Node.js
- npm (or yarn)

### Clone the repository

```bash
git clone https://github.com/code3-dev/sysos.git
cd sysos
```

### Building the UI

```bash
npm run build:css
```

### Install dependencies

```bash
npm install
```

### Run the application

You can start the application using:

```bash
npm start
```

This will launch the application with Electron in development mode.

## Building the Application

To create a production build, use the following commands based on your platform.

### Build for Windows

```bash
npm run build:win
```

### Build for Linux

```bash
npm run build:linux
```

### Build for all platforms

```bash
npm run build
```

After the build process is complete, you will find the executable in the `release` directory.

## Configuration

You can customize the build by modifying the `build` section in `package.json`. This includes changing the app icon, application ID, and adding any additional files required for packaging.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Author: Hossein Pira
- Email: [h3dev.pira@gmail.com](mailto:h3dev.pira@gmail.com)
- Telegram: [@h3dev](https://t.me/h3dev)
- Instagram: [@h3dev.pira](https://instagram.com/h3dev.pira)