# Manta *Docs*

#### Create, organize, and collaborate

Manta Docs is a decentralized knowledge workspace that lets you create, organize and collaborate on rich documents. Compose private notes that only you can see, or public workspaces where people can join and collaborate on.

**Contents**

- [Features](#features)
- [Workspaces & Documents](#workspaces-documents)
- [Technologies](#technologies)
- [Live Product Preview](#live-product-preview)
- [Developer Quick Start](#developer-quick-start)
    - [Project Structure](#project-structure)
    - [Local Deployment](#local-deployment)
    - [Running Web Application](#running-web-application)
- [Interacting With the Contracts](#interacting-with-the-contracts)
    - [Exchange Contract functions](#exchange-contract-functions)
- [Screenshots](#screenshots)

## Features
* Intuitive user experience makes setup, creation, and discovery easy.
* Compose and style documents on a modern rich text editor.
* Workspaces keeps your documents well organized.
* Control access through private and public workspaces.
* Accessible on both desktop and mobile web browser.

## Workspaces & Documents

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/manta-ic/main/docs/workspaces-and-documents.jpg" alt="Workspaces">
</p>

1. **Private Workspace** is a default workspace that lets you create and store documents which can only be viewed by you. There is only one Private Workspace per user, but you can create any number of documents in it.

2. **Public Workspace** lets you create and store documents that other users can see and collaborate on. A Public Workspace comes by default, and you can create any number of new Public Workspaces with any number of documents in them. You can join or leave public workspaces across Manta.

3. **Document** is a content in rich text format that you can create, modify and delete. A document can consist of headings, lists, tables, links and images, and must be assigned to a particular workspace.

3. **Discover** is a special section that lets you find public workspaces across Manta.

## Technologies

<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/jnlewis/manta-ic/main/docs/architecture.jpg" alt="Archiecture">
</p>

**Frontend Application (UX)**

- The frontend web application is developed in React and deployed as an Internet Computer canister smart contract.

**Backend Contract**

- **Main**: The main contract module written in Mokoto that exposes the application functionality for Workspace and Documents creation and management.

- **Storage**: A generic helper module written in Mokoto used to provide key-value storage functionality. This is used by the main contract module.

## Developer Quick Start

#### Project Structure

- **docs** - Project documentation and attachments
- **src**
    - **manta_ic** - Backend contract Mokoto source
    - **manta_ic_assets** - Frontend contract React source

#### Local Deployment

Pre-requisites: 
- [Canister SDK (DFX)](https://internetcomputer.org/docs/current/developer-docs/quickstart/hello10mins/#dfx)
- [NodeJS](https://internetcomputer.org/docs/current/developer-docs/quickstart/hello10mins/#nodejs)

1. Clone the source code from repo
```
git clone git@github.com:jnlewis/manta-ic.git
```

2. Install dependencies

```
cd manta-ic
npm install
```

2. Start the local chain
```
dfx start --clean
```

2. Build and deploy the Canisters
```
dfx deploy
```

3. After deploying, you can access the web application from the Frontend link. Alternatively, you can interact with the backend directly using the Candid link.
```
URLs:
  Frontend:
    manta_ic_assets: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
  Candid:
    manta_ic: http://127.0.0.1:8000/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
```

#### Running Web Application

1. Starting up the web application locally for development with hot reloading
```
npm run start
```

2. Browse the application
```
Visit http://localhost:8080
```

##### Backend Contract Functions
| Function          | Description                                    | Transaction/Query |
|-------------------|------------------------------------------------|-------------|
| createWorkspace   | Creates a new private or public workspace.     | Transaction |
| updateWorkspace   | Renames a workspace.                           | Transaction |
| deleteWorkspace   | Deletes a public workspace.                    | Transaction |
| getWorkspace      | Gets a workspace by ID.                        | Query       |
| listWorkspaces    | Search workspace by keywords.                  | Query       |
| listAllWorkspaces | List all workspaces.                           | Query       |
| createDocument    | Creates a new document in a workspace.         | Transaction |
| updateDocument    | Updates a document or rename a document title. | Transaction |
| deleteDocument    | Deletes a document.                            | Transaction |
| getDocument       | Gets a document by ID.                         | Query       |
| listDocuments     | Search documents by keywords.                  | Query       |
| listAllDocuments  | List all documents.                            | Query       |

## Screenshots

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/manta-ic/main/docs/images/screenshot-documents.png" alt="">
</p>
