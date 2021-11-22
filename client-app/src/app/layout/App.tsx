import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import './styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore]);

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (activityStore.loadingInitial) return <LoadingComponent />

  return (
    <>
      <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activityStore.activities}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
    </>
  );
}

export default observer(App);