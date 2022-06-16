import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import DataStore "./storage";

actor Test {

    public type UserId = Principal;
    stable var nextWorkspaceId : Nat = 1;
    stable var nextDocumentId : Nat = 1;

    type NewWorkspace = {
        title : Text;
        description : Text;
        visibility : Text;
    };
    type Workspace = {
        title : Text;
        description : Text;
        visibility : Text;
        workspaceId : Text;
        ownerId : UserId;
        ownerIdText : Text;
    };

    type NewDocument = {
        title: Text;
        content : Text;
        workspaceId: Text;
    };
    type Document = {
        title: Text;
        content : Text;
        workspaceId: Text;
        documentId : Text;
        ownerId : UserId;
        ownerIdText : Text;
    };

    private let workspaceStore: DataStore.DataStore<Workspace> = DataStore.DataStore<Workspace>();
    private stable var workspaceEntries : [(Text, Workspace)] = [];

    private let documentStore: DataStore.DataStore<Document> = DataStore.DataStore<Document>();
    private stable var documentEntries : [(Text, Document)] = [];

    // WORKSPACE

    public shared(msg) func createWorkspace(newWorkspace: NewWorkspace): async (Text) {

        let ownerId = msg.caller;
        let workspaceId = Nat.toText(nextWorkspaceId);
        let ownerIdText = Principal.toText(ownerId);

        let data : Workspace = {
            title = newWorkspace.title;
            description = newWorkspace.description;
            visibility = newWorkspace.visibility;
            workspaceId = workspaceId;
            ownerId = ownerId;
            ownerIdText = ownerIdText;
        };

        // WorkspaceID,MemberID,Visibility
        // let key : Text = "workspaceId:" # workspaceId # ",memberId:" # Principal.toText(ownerId) # ",visibility:" # newWorkspace.visibility;
        let key : Text = workspaceId;
        workspaceStore.put(key, data);

        nextWorkspaceId += 1;

        return workspaceId;
    };

    public query func getWorkspace(workspaceId: Text) : async (?Workspace) {
        let entry: ?Workspace = workspaceStore.get(workspaceId);
        return entry;
    };

    public func updateWorkspace(workspaceId: Text, data: Workspace) : async () {
        workspaceStore.put(workspaceId, data);
    };

    public func deleteWorkspace(workspaceId: Text) : async () {
        let entry: ?Workspace = workspaceStore.del(workspaceId);
    };

    public query func listWorkspaces(filter: ?DataStore.DataFilter) : async [(Text, Workspace)] {
        let results: [(Text, Workspace)] = workspaceStore.list(filter);
        return results;
    };

    public query func listAllWorkspaces() : async [(Text, Workspace)] {
        let results: [(Text, Workspace)] = workspaceStore.listAll();
        return results;
    };

    // DOCUMENTS

    public shared(msg) func createDocument(newDoc: NewDocument): async (Text) {

        let ownerId = msg.caller;
        let documentId = Nat.toText(nextDocumentId);
        let ownerIdText = Principal.toText(ownerId);

        let data : Document = {
            title = newDoc.title;
            content = newDoc.content;
            workspaceId = newDoc.workspaceId;
            documentId = documentId;
            ownerId = ownerId;
            ownerIdText = ownerIdText;
        };

        // let key : Text = "documentId:" # documentId # ",ownerId:" # Principal.toText(ownerId);
        let key : Text = documentId;

        documentStore.put(key, data);

        nextDocumentId += 1;

        return documentId;
    };

    public query func getDocument(documentId: Text) : async (?Document) {
        let entry: ?Document = documentStore.get(documentId);
        return entry;
    };

    public func updateDocument(documentId: Text, data: Document) : async () {
        documentStore.put(documentId, data);
    };

    public func deleteDocument(documentId: Text) : async () {
        let entry: ?Document = documentStore.del(documentId);
    };

    public query func listDocuments(filter: ?DataStore.DataFilter) : async [(Text, Document)] {
        let results: [(Text, Document)] = documentStore.list(filter);
        return results;
    };

    public query func listAllDocuments() : async [(Text, Document)] {
        let results: [(Text, Document)] = documentStore.listAll();
        return results;
    };

    // UTILS

    public shared(msg) func getCaller(): async (Text) {
        return Principal.toText(msg.caller);
    };

    // UPGRADE

    system func preupgrade() {
        documentEntries := Iter.toArray(documentStore.preupgrade().entries());
        workspaceEntries := Iter.toArray(workspaceStore.preupgrade().entries());
    };

    system func postupgrade() {
        documentStore.postupgrade(documentEntries);
        documentEntries := [];

        workspaceStore.postupgrade(workspaceEntries);
        workspaceEntries := [];
    };
};
