import { manta_ic } from "../../../declarations/manta_ic";

export const getOwnWorkspaces = async () => {
    console.log('[workspaceService.getOwnWorkspaces] Begin');

    const result = [];

    const [identity, workspaces, documents] = await Promise.all([
        manta_ic.getCaller(),
        manta_ic.listAllWorkspaces(),
        manta_ic.listAllDocuments(),
    ]);

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

    const [privateWorkspaceId, publicWorkspaceId] = await Promise.all([
        manta_ic.createWorkspace({ title: 'Private Workspace', description: 'My Private Workspace', visibility: 'private' }),
        manta_ic.createWorkspace({ title: 'Public Workspace', description: 'My Public Workspace', visibility: 'public' }),
    ]);

    const [privateDocumentId, publicDocumentId] = await Promise.all([
        manta_ic.createDocument({
            title: 'Welcome Note',
            content : `<h3>Hello there!</h3>
                        <p> </p>
                        <p>This is a <strong>document</strong> in your <i>Private Workspace</i>. Only you can see the documents in your Private Workspace, so write what you want here or create new documents. Anything you save is permanently kept until you delete it.</p>
                        <p> </p>
                        <p><strong>Some tips to get you started:</strong></p>
                        <ul>
                        <li>Create new documents by clicking on the "Add New" button to the left.</li>
                        <li>Documents in Private Workspace can only be seen by you.</li>
                        <li>Documents in Public Workspace can be seen by anyone on Manta.</li>
                        <li>You can create as many public workspaces as you wish, and others can join these workspaces and collaborate.</li>
                        <li>You can format your text just by highlighting them to bring up the formatting menu.</li>
                        <li>Any text on this area is editable. Go ahead and select some text here.</li>
                        <li>See the big "Welcome" text at the top? That's the title of this document. Click on it to rename.</li>
                        <li>Don't forget to save your document by clicking on "Save" at the top.</li>
                        </ul>
                        <p> </p>
                        <p>Now that we have run through the basics, feel free to delete this note - or keep it for future references. Thanks for using Manta. We're excited to have you aboard!</p>`,
            workspaceId: privateWorkspaceId,
        }),
        manta_ic.createDocument({
            title: 'For Everyone',
            content : `<h3>This is public.</h3>
                        <p><i>Anything you write on public workspaces can be viewed by anyone on Manta.</i></p>`,
            workspaceId: publicWorkspaceId,
        }),
    ]);

    console.log('[workspaceService.createDefaultWorkspaces] Done');
};

export const createPublicWorkspace = async () => {
    console.log('[workspaceService.createPublicWorkspace] Begin');

    await manta_ic.createWorkspace({ title: 'New Public Workspace', description: 'My Public Workspace', visibility: 'public' });
    
    console.log('[workspaceService.createPublicWorkspace] Done');
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
