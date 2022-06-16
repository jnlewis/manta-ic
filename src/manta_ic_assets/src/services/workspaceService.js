import { manta_ic } from "../../../declarations/manta_ic";

export const getIdentity = async () => {
    console.log('[workspaceService.getIdentity] Begin');

    return await manta_ic.getCaller();
};

export const getOwnWorkspaces = async () => {
    console.log('[workspaceService.getOwnWorkspaces] Begin');

    const result = [];

    const identity = await getIdentity();

    const workspaces = await manta_ic.listAllWorkspaces();
    const documents = await manta_ic.listAllDocuments();

    if (workspaces && workspaces.length > 0) {

        workspaces.forEach(element => {
            const workspaceData = element[1];
            if (workspaceData.ownerIdText === identity) {
                const workspaceDocuments = filterDocuments(documents, workspaceData.workspaceId);
                result.push({
                    workspaceId: workspaceData.workspaceId,
                    title: workspaceData.title,
                    description: workspaceData.description,
                    visibility: workspaceData.visibility,
                    documents: workspaceDocuments
                });
            }
        });
    }

    return result;
};

export const filterDocuments = (documents, workspaceId) => {
    console.log('[workspaceService.getOwnDocuments] Begin');

    const result = [];

    if (documents && documents.length > 0) {

        documents.forEach(element => {
            const documentData = element[1];
            if (documentData.workspaceId == workspaceId) {
                result.push({
                    documentId: documentData.documentId,
                    workspaceId: documentData.workspaceId,
                    title: documentData.title,
                    content: documentData.content,
                    ownerId: documentData.ownerId,
                    ownerIdText: documentData.ownerIdText
                });
            }
        });
    }

    return result;
};

export const createDefaultWorkspaces = async () => {
    console.log('[workspaceService.createDefaultWorkspaces] Begin');

    const privateWorkspaceId = await manta_ic.createWorkspace({ title: 'Private Workspace', description: 'My Private Workspace', visibility: 'private' });
    const publicWorkspaceId = await manta_ic.createWorkspace({ title: 'Public Workspace', description: 'My Public Workspace', visibility: 'public' });

    await manta_ic.createDocument({
        title: 'Welcome',
        content : `<h3>Hello there.</h3>
                    <p><i>This is your personal note space. Write what you want here.</i></p>
                    <p><i>Only you can see the documents in your Private Workspace.</i></p>
                    <p><i>Anything you save is permanently kept until you delete it.</i></p>
                    <p><br data-cke-filler="true"></p>
                    <p><strong>Some tips to get you started:</strong></p>
                    <ul>
                    <li>Create new documents by clicking on the "+" button to the left.</li>
                    <li>Documents in Private Workspace can only be seen by you.</li>
                    <li>Documents in Public Workspace can be seen by anyone on Manta.</li>
                    <li>You can create as many public workspaces as you wish, and others can join these workspaces and collaborate.</li>
                    <li>You can format your text just by highlighting them to bring up the formatting menu.</li>
                    <li>Any text on this area is editable. Go ahead and select or edit some.</li>
                    <li>See the big "Welcome" text at the top? That's the title of this document. Click "Rename" to change it.</li>
                    <li>Don't forget to save your document by clicking on "Save" at the top.</li>
                    </ul>
                    <p><br data-cke-filler="true"></p>
                    <p>Now that we have run through the basics, feel free to delete this note - or keep it for future references.</p>
                    <p><br data-cke-filler="true"></p>
                    <p>Thanks for using Manta. We're excited to have you aboard!</p>`,
        workspaceId: privateWorkspaceId,
    });

    await manta_ic.createDocument({
        title: 'For Everyone',
        content : `<h3>This is public.</h3>
                    <p><i>Anything you write on public workspaces can be viewed by anyone on Manta.</i></p>`,
        workspaceId: publicWorkspaceId,
    });

    console.log('[workspaceService.createDefaultWorkspaces] Done');
};

export const createDocument = async (workspaceId) => {
    console.log('[workspaceService.createDocument] Begin');
    await manta_ic.createDocument({
        title: 'Untitled',
        content : 'Your document is created. Select the title to rename this document and then type here to change its contents.',
        workspaceId: workspaceId,
    });
};

export const updateDocument = async (documentId, title, content, workspaceId, ownerId, ownerIdText) => {
    await manta_ic.updateDocument(documentId, {
        title,
        content,
        workspaceId,
        documentId,
        ownerId,
        ownerIdText,
    });
};

export const deleteDocument = async (documentId) => {
    await manta_ic.deleteDocument(documentId);
};
