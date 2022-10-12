/*
 *
 * HomePage
 *
 */

import React from 'react';
import { Layout, BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import { Card } from '@strapi/design-system/Card';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <Box>
      <Layout>
        <Box background="neutral100">
          <BaseHeaderLayout as="h2" title="Refreshing Plugin" subtitle="Add refresh tokens to your app"/>
        </Box>
        <Box background="neutral100">
          <ContentLayout>
            <Card>
              <Box padding={4}>
                <Stack>
                  <Typography>
                    Refreshing adds Refresh Tokens to your email local provider.
                  </Typography>
                </Stack>
              </Box>
            </Card>
          </ContentLayout>
        </Box>
      </Layout>
    </Box>    
  );
};

export default HomePage;
