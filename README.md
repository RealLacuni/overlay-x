<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="icon-512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Overlay-X</h3>




  <p align="center">
    A simple desktop application that allows you to overlay a transparent image centered around the cursor. Inspired by tools such as F.lux and visual snow relief overlay.
    <br />
    <a href="https://github.com/RealLacuni/overlay-x/releases/latest"><strong>Download Latest »</strong></a>
    <br />
    <a href="https://github.com/RealLacuni/overlay-x/issues">Report Bug</a>
    ·
    <a href="https://github.com/RealLacuni/overlay-x/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About Overlay-X

Check out some of the possible uses of the tool in the video below:

<video autoplay loop muted src="demo.mp4">
</video>

Overlay-X is a simple desktop application that allows you to overlay a transparent image centered around the cursor. Inspired by tools such as F.lux and [visual snow relief overlay](https://github.com/belvederef/visual-snow-relief-overlay).

Select from different overlay shapes and control aspects of the overlay such as transparency, size, and color.

This tool is designed with the intent of being useful for people who suffer from visual snow, floaters, or other visual disturbances. It can also be used to help with eye strain and fatigue*.
It can be used to reduce contrast, and selectively reduce brightness in areas of the screen.

*\* This tool is not a replacement for medical advice. If you are experiencing visual disturbances, please consult a medical professional.*
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.css]][Tailwind-url]
* [![Electron][Electron.js]][Electron-url]
* [![Electron Forge][Electron-Forge.js]][Electron-Forge-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Go to the latest release page [here](https://github.com/RealLacuni/overlay-x/releases/latest).
2. Download the latest release for your operating system.
    (Windows: `overlay-x.exe`, Mac: `overlay-x.dmg / overlay-x-mac.zip`, Linux: `overlay-x.AppImage / overlay-x_amd64.deb`)
3. Extract the file if necessary.
4. Run the executable file.

Uninstalling is as simple as deleting the executable file. If a clean install is needed, remove the user preferences located in the following locations:

    windows: ~\User\AppData\Roaming\overlay-x

    mac: ~/Library/Application Support/overlay-x

    linux: ~/.config/overlay-x

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

The application is designed to be simple and intuitive to use. From the main menu, you can launch the overlay, access the settings menu, or exit the application.

The settings menu allows you to customize the overlay. You can select general features such as the shape of the overlay, the color, the transparency, and the size. 

  *Size and offset*: A numerical slider input. Can be adjusted using the arrow keys. The overlay will be centered around the cursor. At maximum size, the value will change to "Fullscreen" this represents the overlay covering the entire screen. 
  *Invert Overlay*: Inverts the color of the overlay. Useful for reducing contrast. Default (off) has the overlay centered at the cursor with the selected color. When inverted, empty space in the shape of the overlay will isntead be centered at the cursor.
  *Opacity*: A numerical slider input. Can be adjusted using the arrow keys. The overlay will be centered around the cursor.
  *Shape*: Select from a list of shapes. Currently, the options are: Circle and Rectangle.
  *Color*: Select a color for the overlay. The color picker is a standard color picker.

Advanced settings currently include setting hotkeys.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Bug Fixes
- [ ] Dark Mode for UI
- [ ] Image support for Overlay
- [ ] Increased Customization
    - [ ] Profile Names
    - [ ] Add or Remove Profiles


See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU General Public License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[Submit Issues or Features](https://github.com/RealLacuni/overlay-x/issues)

[Email](mailto:renepazitnyeng@gmail.com)

Project Link: [https://github.com/RealLacuni/overlay-x](https://github.com/RealLacuni/overlay-x)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Visual Snow Relief Overlay](https://github.com/belvederef/visual-snow-relief-overlay) for providing the inspiration to create this tool.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Electron.js]: https://img.shields.io/badge/Electron-191717?style=for-the-badge&logo=electron&logoColor=white
[Electron-url]: https://www.electronjs.org/
[Electron-Forge.js]: https://img.shields.io/badge/Electron_Forge-6D4A9C?style=for-the-badge&logo=electron&logoColor=white
[Electron-Forge-url]: https://www.electronforge.io/