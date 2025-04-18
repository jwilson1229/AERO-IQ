import { 
    Box, Flex, Grid, GridItem, Text, Heading, Spinner
  } from "@chakra-ui/react";
  import Sidebar from "../components/Sidebar";
  import Header from "../components/Header";
  import { useEffect, useState } from "react";
  import { gql, useQuery } from "@apollo/client";
  import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
  import "../styles/analytics.css";
  
  
  interface ParlayLeg {
    title: string;
    odds: number;
  }
  
  interface BetSlip {
    _id: string;
    betType: 'Straightup' | 'Parlay';
    stake: number;
    payout: number;
    odds?: number;
    straightBetTitle?: string;
    legs?: ParlayLeg[];
    createdAt: string;
  }
  
  interface BetStats {
    totalBets: number;
    totalWagered: number;
    totalPayout: number;
    profit: number;
    straightBets: number;
    parlayBets: number;
    avgStake: number;
    recentBets: BetSlip[];
  }
  
  interface ChartDataPoint {
    name: string;
    value: number;
  }
  
  interface MonthlyDataPoint {
    month: string;
    wager: number;
    payout: number;
  }
  
  // GraphQL query to fetch all bet slips
  const GET_ALL_BETSLIPS = gql`
    query GetBetSlips {
      betSlips {
        _id
        betType
        stake
        payout
        odds
        straightBetTitle
        legs {
          title
          odds
        }
        createdAt
      }
    }
  `;
  
  const Analytics = () => {
    const { loading, error, data } = useQuery(GET_ALL_BETSLIPS);
    const [betStats, setBetStats] = useState<BetStats>({
      totalBets: 0,
      totalWagered: 0,
      totalPayout: 0,
      profit: 0,
      straightBets: 0,
      parlayBets: 0,
      avgStake: 0,
      recentBets: []
    });
  
    const [betTypeData, setBetTypeData] = useState<ChartDataPoint[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  
    // Colors for charts
    const colors = ["#2E5BFF", "#8C54FF", "#00C1D4", "#FFB100"];
    
    useEffect(() => {
      if (data && data.betSlips) {
        const betSlips: BetSlip[] = data.betSlips;
        
        // Calculate stats
        const totalBets = betSlips.length;
        const totalWagered = betSlips.reduce((sum: number, bet: BetSlip) => sum + bet.stake, 0);
        const totalPayout = betSlips.reduce((sum: number, bet: BetSlip) => sum + bet.payout, 0);
        const profit = totalPayout - totalWagered;
        const straightBets = betSlips.filter((bet: BetSlip) => bet.betType === 'Straightup').length;
        const parlayBets = betSlips.filter((bet: BetSlip) => bet.betType === 'Parlay').length;
        const avgStake = totalBets > 0 ? totalWagered / totalBets : 0;
        
        // Recent bets - last 5
        const recentBets = [...betSlips]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        setBetStats({
          totalBets,
          totalWagered,
          totalPayout,
          profit,
          straightBets,
          parlayBets,
          avgStake,
          recentBets
        });
        
        // Bet type distribution data for pie chart
        setBetTypeData([
          { name: 'Straight Bets', value: straightBets },
          { name: 'Parlay Bets', value: parlayBets }
        ]);
        
        // Prepare monthly data
        const monthlyDataMap: Record<string, MonthlyDataPoint> = {};
        betSlips.forEach((bet: BetSlip) => {
          const date = new Date(bet.createdAt);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          
          if (!monthlyDataMap[monthYear]) {
            monthlyDataMap[monthYear] = {
              month: monthYear,
              wager: 0,
              payout: 0
            };
          }
          
          monthlyDataMap[monthYear].wager += bet.stake;
          monthlyDataMap[monthYear].payout += bet.payout;
        });
        
        setMonthlyData(Object.values(monthlyDataMap));
      }
    }, [data]);
  
    if (loading) return (
      <Flex h="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  
    if (error) return (
      <Flex h="100vh" justify="center" align="center">
        <Text>Error loading data: {error.message}</Text>
      </Flex>
    );
    
    return (
      <Flex className="analytics-container">
        <Sidebar />
  
        <Box className="analytics-content">
          <Header />
          
          <Heading className="analytics-title" size="lg">Betting Analytics Dashboard</Heading>
  
          {/* Stats Overview Cards */}
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
              <Box className="stat-card">
                <Text className="stat-label">Total Bets</Text>
                <Heading className="stat-value" size="lg">{betStats.totalBets}</Heading>
              </Box>
            </GridItem>
  
            <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
              <Box className="stat-card">
                <Text className="stat-label">Total Wagered</Text>
                <Heading className="stat-value" size="lg">${betStats.totalWagered.toFixed(2)}</Heading>
              </Box>
            </GridItem>
  
            <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
              <Box className="stat-card">
                <Text className="stat-label">Total Payout</Text>
                <Heading className="stat-value" size="lg">${betStats.totalPayout.toFixed(2)}</Heading>
              </Box>
            </GridItem>
  
            <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
              <Box className="stat-card">
                <Text className="stat-label">Profit</Text>
                <Heading className={`stat-value ${betStats.profit >= 0 ? 'profit-positive' : 'profit-negative'}`} size="lg">
                  ${betStats.profit.toFixed(2)}
                </Heading>
                <Text className="small-text">
                  {betStats.totalWagered > 0 ? `${((betStats.profit / betStats.totalWagered) * 100).toFixed(2)}%` : '0%'}
                </Text>
              </Box>
            </GridItem>
          </Grid>
  
          {/* Charts Row */}
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            {/* Bet Type Distribution */}
            <GridItem colSpan={{ base: 12, md: 6 }}>
              <Box className="chart-container">
                <Heading className="chart-title" size="md">Bet Type Distribution</Heading>
                {betTypeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="85%">
                    <PieChart>
                      <Pie
                        data={betTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }:any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {betTypeData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Text>No bet type data available</Text>
                )}
              </Box>
            </GridItem>
  
            {/* Monthly Performance */}
            <GridItem colSpan={{ base: 12, md: 6 }}>
              <Box className="chart-container">
                <Heading className="chart-title" size="md">Monthly Performance</Heading>
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="wager" stroke="#8884d8" name="Wagered" />
                      <Line type="monotone" dataKey="payout" stroke="#82ca9d" name="Payout" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Text>No monthly data available</Text>
                )}
              </Box>
            </GridItem>
          </Grid>
  
          {/* Recent Bets */}
          <Box className="bets-table-container">
            <Heading className="chart-title" size="md">Recent Bets</Heading>
            {betStats.recentBets.length > 0 ? (
              <Box>
                {/* Table Header */}
                <Grid templateColumns="repeat(6, 1fr)" className="table-header">
                  <GridItem>Bet Type</GridItem>
                  <GridItem>Stake</GridItem>
                  <GridItem>Odds</GridItem>
                  <GridItem>Payout</GridItem>
                  <GridItem>Profit</GridItem>
                  <GridItem>Date</GridItem>
                </Grid>
                
                {/* Table Rows */}
                {betStats.recentBets.map((bet) => (
                  <Grid templateColumns="repeat(6, 1fr)" key={bet._id} className="table-row">
                    <GridItem>{bet.betType === 'Straightup' ? bet.straightBetTitle : 'Parlay'}</GridItem>
                    <GridItem>${bet.stake.toFixed(2)}</GridItem>
                    <GridItem>{bet.betType === 'Straightup' && bet.odds ? bet.odds : '-'}</GridItem>
                    <GridItem>${bet.payout.toFixed(2)}</GridItem>
                    <GridItem>${(bet.payout - bet.stake).toFixed(2)}</GridItem>
                    <GridItem>{bet.createdAt}</GridItem>
                  </Grid>
                ))}
              </Box>
            ) : (
              <Text>No recent bets available</Text>
            )}
          </Box>
  
          {/* Betting Summary */}
          <Box className="summary-card">
            <Heading className="summary-title" size="md">Betting Summary</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <Box>
                <Text className="summary-stat-title">Average Stake</Text>
                <Heading className="summary-stat-value" size="md">${betStats.avgStake.toFixed(2)}</Heading>
              </Box>
              <Box>
                <Text className="summary-stat-title">Straight Bets</Text>
                <Heading className="summary-stat-value" size="md">{betStats.straightBets}</Heading>
                <Text className="small-text">
                  {betStats.totalBets > 0 ? `${((betStats.straightBets / betStats.totalBets) * 100).toFixed(1)}%` : '0%'} of all bets
                </Text>
              </Box>
              <Box>
                <Text className="summary-stat-title">Parlay Bets</Text>
                <Heading className="summary-stat-value" size="md">{betStats.parlayBets}</Heading>
                <Text className="small-text">
                  {betStats.totalBets > 0 ? `${((betStats.parlayBets / betStats.totalBets) * 100).toFixed(1)}%` : '0%'} of all bets
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Flex>
    );
  };
  
  export default Analytics;
