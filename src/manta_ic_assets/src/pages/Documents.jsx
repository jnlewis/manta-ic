import React, { useState, useEffect } from "react";
import {Container, Row, Col, Nav, Button } from "react-bootstrap";
import "../../assets/page.documents.css";
import DocumentHeader from '../components/DocumentHeader/DocumentHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { getOwnWorkspaces, createDefaultWorkspaces, createDocument, updateDocument, deleteDocument } from "../services/workspaceService";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

const Documents = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isDocumentActionLoading, setIsDocumentActionLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [workspaces, setWorkspaces] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [changedTitle, setChangedTitle] = useState('');
  const [changedContent, setChangedContent] = useState('');

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {

    setIsLoading(true);

    let workspaces = await getOwnWorkspaces();
    if (!workspaces || workspaces.length === 0) {
      console.log('[Documents.init] No workspaces found. Creating default workspaces.');

      await createDefaultWorkspaces();

      workspaces = await getOwnWorkspaces();

      setWorkspaces(workspaces);
    } else {
      setWorkspaces(workspaces);
    }

    setIsLoading(false);
  };

  const handleCreateWorkspace = () => {
    
  }

  const handleLoadDocument = (workspaceId, documentId) => {
    const workspace = workspaces.find(workspace => workspace.workspaceId === workspaceId);
    if (workspace) {
      const document = workspace.documents.find(document => document.documentId === documentId);
      setSelectedDocument(document);
      setChangedTitle(document.title);
      setChangedContent(document.content);
    }
    setSelectedMenu('document');
  }

  const handleCreateDocument = async (workspaceId) => {
    await createDocument(workspaceId);
    await loadWorkspaces();
    setSelectedMenu('document');
  }

  const handleSaveDocument = async () => {
    setIsDocumentActionLoading(true);
    await updateDocument(
      selectedDocument.documentId, 
      changedTitle, 
      changedContent, 
      selectedDocument.workspaceId, 
      selectedDocument.ownerId, 
      selectedDocument.ownerIdText, 
    );

    selectedDocument.content = changedContent;
    await loadWorkspaces();
    setIsDocumentActionLoading(false);
  }

  const handleDeleteDocument = async () => {
    setIsDocumentActionLoading(true);
    await deleteDocument(selectedDocument.documentId);
    await loadWorkspaces();
    setIsDocumentActionLoading(false);
    setSelectedDocument(null);
    setSelectedMenu(null);
  }

  return (
    <>
      <Container fluid>
        <Row className="flex-container">  

            <div id="sidebar-wrapper" style={{ marginLeft: `${isMenuOpen ? '0' : '-260px'}`}}>    
              <div className="sidebar">
                <div className="sidebar-heading">MANTA</div>
                <nav className="tree-nav">
                  {workspaces && (
                    <>
                      <a className="tree-nav__item-title" onClick={() => setSelectedMenu('discover')}>
                        <i className="icon ion-ios-world"></i> DISCOVER
                      </a>
                      <a className="tree-nav__item-title" onClick={() => setSelectedMenu('bookmarks')}>
                        <i className="icon ion-android-star"></i> BOOKMARKS
                      </a>
                    </>
                  )}
                  {workspaces && 
                    workspaces.filter(x => x.visibility === 'private').map((workspace) => (
                      <details key={workspace.workspaceId} className="tree-nav__item is-expandable">
                        <summary className="tree-nav__item-title">{workspace.title}</summary>
                        <div className="tree-nav__item">
                          {workspace.documents.map((document) => (
                            <a key={document.documentId} className="tree-nav__item-title" onClick={() => handleLoadDocument(workspace.workspaceId, document.documentId)}><i className="icon ion-locked"></i>{document.title}</a>
                          ))}
                          <a className="tree-nav__item-title highlight" onClick={() => handleCreateDocument(workspace.workspaceId)}><i className="icon ion-ios-plus"></i> ADD NEW</a>
                        </div>
                      </details>
                  ))}
                  {workspaces && 
                    workspaces.filter(x => x.visibility === 'public').map((workspace) => (
                      <details key={workspace.workspaceId} className="tree-nav__item is-expandable">
                        <summary className="tree-nav__item-title">{workspace.title}</summary>
                        <div className="tree-nav__item">
                          {workspace.documents.map((document) => (
                            <a key={document.documentId} className="tree-nav__item-title" onClick={() => handleLoadDocument(workspace.workspaceId, document.documentId)}><i className="icon ion-eye"></i>{document.title}</a>
                          ))}
                          <a className="tree-nav__item-title highlight" onClick={() => handleCreateDocument(workspace.workspaceId)}><i className="icon ion-ios-plus"></i> ADD NEW</a>
                        </div>
                      </details>
                  ))}
                  {workspaces && (
                    <a className="tree-nav__item-title highlight" onClick={() => handleCreateWorkspace()}><i className="icon ion-ios-plus"></i> NEW WORKSPACE</a>
                  )}
                  </nav>
              </div>
            </div>
            
            <div id="page-content-wrapper">
              <div className="document-header-wrapper">
                <a onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <div className="icon-burger">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </div>
                </a>
                <div className="document-header-right">
                  {isDocumentActionLoading && (
                    <LoadingIndicator size="small" />
                  )}
                  {!isDocumentActionLoading && selectedMenu === 'document' && selectedDocument && (
                    <>
                      <Button onClick={() => handleSaveDocument()}>Save</Button>
                      <Button onClick={() => handleDeleteDocument()}>Delete</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="page-content">
                {isLoading && (<h2 className="unselected-title"><LoadingIndicator /></h2>)}
                {!isLoading && !selectedMenu && (
                  <h2 className="unselected-title">select a section on the left to begin</h2>
                )}
                {!isLoading && selectedMenu === 'discover' && (
                  <h2 className="unselected-title">Here is where you can find and join public workspaces once more people onboard Manta</h2>
                )}
                {!isLoading && selectedMenu === 'bookmarks' && (
                  <h2 className="unselected-title">Your bookmarked documents anywhere across Manta will appear here</h2>
                )}
                {!isLoading && selectedMenu === 'document' && selectedDocument && (
                  <>
                    <input 
                      type="text" 
                      value={changedTitle} 
                      className="title-input" 
                      onChange={(event) => setChangedTitle(event.target.value)}>
                    </input>
                    <CKEditor
                        editor={ BalloonEditor }
                        data={selectedDocument.content}
                        onReady={ editor => {
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setChangedContent(data);
                        } }
                        onBlur={ ( event, editor ) => {
                        } }
                        onFocus={ ( event, editor ) => {
                        } }
                    />
                  </>
                )}
              </div>
            </div> 
        </Row>
      </Container>
    </>
  );
};

export default Documents;
