import React from 'react';
import {
    Link,
    Route,
    BrowserRouter as Router,
    Navigate,
    Routes
} from 'react-router-dom';

import AuthUser from './components/AuthUser';
import AuthAdmin from "./components/AuthAdmin";
import HomePageUser from './components/HomePageUser';
import HomePageAdmin from './components/HomePageAdmin';
import ActiveElectionSession from './components/ActiveElectionSession';
import BallotPaper from './components/BallotPaper';
import ConformationVote from './components/ConformationVote';
import VoteSuccessPage from './components/VoteSuccessPage';
import ElectionFileStage1 from './components/ElectionFileStage1';
import ElectionFileStage2 from './components/ElectionFileStage2';
import ElectionFileStage3 from './components/ElectionFileStage3';
import ElectionFileStage4 from './components/ElectionFileStage4';
import ElectionFileStage5 from './components/ElectionFileStage5';
import ReviewElectionFileActive from './components/ReviewElectionFileActive';
import EditElectionFile from './components/EditElectionFile';
import ResultPage from './components/ResultPage';
import ElectionResultUserInterface from './components/ElectionResultUserInterface';
import ElectionResultDetails from './components/ElectionResultDetails';
import AddPoliticalParty from './components/AddPoliticalParty';

export default function App() {
    return(
        <>
        <Router>
            <Routes>
                <Route exact path="/" element={<AuthUser />} />
                <Route exact path="/home-user" element={<HomePageUser />} />
                <Route exact path="/active-election-session" element={<ActiveElectionSession />} />
                <Route exact path="/ballot-paper" element={<BallotPaper />} />
                <Route exact path="/conform-vote" element={<ConformationVote />} />
                <Route exact path="/vote-conformed" element={<VoteSuccessPage />} />

                {/* Admin Routes */}
                <Route exact path="/login-admin" element={<AuthAdmin />} />
                <Route exact path="/home-admin" element={<HomePageAdmin />} />
                <Route exact path="/election-file/stage-1" element={<ElectionFileStage1 />} />
                <Route exact path="/election-file/stage-2" element={<ElectionFileStage2 />} />
                <Route exact path="/election-file/stage-3" element={<ElectionFileStage3 />} />
                <Route exact path="/election-file/stage-4" element={<ElectionFileStage4 />} />
                <Route exact path="/election-file/stage-5" element={<ElectionFileStage5 />} />
                <Route exact path="/review-and-active" element={<ReviewElectionFileActive />} />
                <Route exact path="/edit-election-file" element={<EditElectionFile />} />
                <Route exact path="/result" element={<ResultPage />} />

                {/* Election Results */}
                <Route exact path="/election-results" element={<ElectionResultUserInterface />} />
                <Route exact path="/election-result/:state" element={<ElectionResultDetails />} />
                
                <Route exact path="/add-political-party" element={<AddPoliticalParty />} />
                
            </Routes>
        </Router>
        </>
    );
}