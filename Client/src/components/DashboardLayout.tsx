import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex h="100vh">
            <Sidebar />

            <Box flex="1" bg="gray.100" p={4}>
                <Header />

                <Grid
                    templateColumns="repeat(12, 1fr)"
                    gap={4}
                    mt={4}
                >
                    <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
                        <Box bg="white" p={6} borderRadius="md" shadow="md" h="200px">
                            📊 <strong>Stats Overview</strong>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
                        <Box bg="white" p={6} borderRadius="md" shadow="md" h="150px">
                            ⚠️ <strong>Alerts</strong>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={{ base: 12, md: 12, lg: 4 }}>
                        <Box bg="white" p={6} borderRadius="md" shadow="md" h="250px">
                            📅 <strong>Upcoming Events</strong>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={12}>
                        <Box bg="white" p={6} borderRadius="md" shadow="md" h="300px">
                            📈 <strong>Expanded Analytics</strong>
                        </Box>
                    </GridItem>
                </Grid>

                {children}
            </Box>
        </Flex>
    );
};

export default DashboardLayout;
