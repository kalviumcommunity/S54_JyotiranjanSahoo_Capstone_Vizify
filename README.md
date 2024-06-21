# Vizify

Vizify is a web application that leverages AI-based generation to turn text into images and presentations, offering users a seamless and creative way to visualize their ideas.

## Deployed Website

### [Vizify](https://vizify.netlify.app)

## Deployed Server

### [Vizify API](https://s54-jyotiranjansahoo-capstone-vizify.onrender.com)

## Features

- **Text to Image Conversion**: Convert plain text into visually appealing images with AI-powered generation.
- **Text to Presentation Conversion**: Transform text content into dynamic presentations, perfect for showcasing ideas or concepts.
- **User-Friendly Interface**: Intuitive and easy-to-use interface for a smooth user experience.

## Technologies Used

- **MERN Stack**: Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack for robust and scalable development.
- **OpenAI ChatGPT**: Incorporates ChatGPT  for AI-based content generation, ensuring reliable and consistent results.
- **LangChainJS**: Implements LangChainJS for natural language processing, enabling accurate text analysis and conversion.
- **PPTXGEN JS**: Integrates PPTXGEN JS for creating PowerPoint presentations from text content, offering versatility in presentation formats.
- **Stable Diffusion**: Utilizes Stable Diffusion for AI-powered text-to-image generation, ensuring high-quality visual outputs.

## Project Architecture and Design Decisions

Vizify is designed with a modular and scalable architecture to ensure flexibility and maintainability. Here are some key design decisions and architectural components:

### Frontend

- **React.js**: The frontend of Vizify is built using React.js to create a dynamic and responsive user interface.

### Backend

- **Node.js and Express.js**: The backend server is built using Node.js and Express.js, providing a robust and efficient server-side environment.
- **MongoDB**: MongoDB is used as the database to store user data, images, and presentation content.
- **LangChainJS Integration**: Integration with LangChainJS enables natural language processing for accurate text analysis and conversion.

### AI Integration

- **ChatGPT**: Vizify leverages Gemini for AI-powered content generation, ensuring reliable and consistent results.
- **Stable Diffusion**: Stable Diffusion is incorporated for AI-based text-to-image generation, ensuring high-quality visual outputs.

### Third-Party Libraries

- **PPTXGEN JS**: Integration with PPTXGEN JS allows for the creation of PowerPoint presentations from text content, offering versatility in presentation formats.

### Deployment

- **Server Deployment (Render)**: The backend server is deployed on Render, providing a scalable and reliable hosting environment. Render offers simple deployment workflows, automatic scaling, and built-in SSL certificates for secure communication.
  
- **Frontend Deployment (Netlify)**: The frontend of Vizify is deployed on Netlify, offering a seamless and efficient hosting solution for static assets. Netlify's CDN ensures fast loading times and global availability of the application.


This architecture and design decisions aim to provide a solid foundation for Vizify, ensuring both functionality and performance while facilitating future enhancements and additions.

## Getting Started

To get started with Vizify locally, follow these steps:

1. Clone the repository: `git clone https://github.com/spjyotiranjan/vizify.git`
2. Install dependencies for both the client and server:
   - Client: `cd client && npm install`
   - Server: `cd server && npm install`
3. Set up environment variables:
   - Create a `.env` file in the server directory and configure necessary environment variables (e.g., database connection string, API keys).
4. Start the development server:
   - Client: `cd client && npm run dev`
   - Server: `cd server && npm run devStart`

## Contributing

We welcome contributions from the community to improve Vizify. If you'd like to contribute, please follow these guidelines:

1. **Fork** the repository by clicking the "Fork" button on the top right corner of this page.
2. **Clone** your forked repository to your local machine. Replace `{your-username}` with your GitHub username:

    ```sh
    git clone https://github.com/{your-username}/vizify.git
    ```

3. **Create a new branch** for your feature or bug fix:

    ```sh
    git checkout -b feature/your-feature
    ```

4. **Make your changes** and ensure they adhere to our coding standards.
5. **Test** your changes thoroughly to ensure they work as expected.
6. **Commit** your changes with descriptive commit messages:

    ```sh
    git commit -am 'Add feature: Description of your changes'
    ```

7. **Push** your changes to your forked repository:

    ```sh
    git push origin feature/your-feature
    ```

8. **Submit a Pull Request (PR)**:
   - Go to the GitHub page of your forked repository.
   - Click on the "New Pull Request" button.
   - Provide a clear title and description for your PR, explaining the changes you've made.
   - Once reviewed, your PR will be merged into the main branch.

By following these steps, you can help improve Vizify and contribute to making it even better for users. We appreciate your contributions!



## Contact

For any inquiries or feedback, feel free to contact us at **jyotiranjan.sahoo@kalvium.community**.


