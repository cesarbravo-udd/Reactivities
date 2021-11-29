import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { List } from 'semantic-ui-react';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size]);

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" inverted={true} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})