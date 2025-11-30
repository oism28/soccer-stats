import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";
import {
    getCompeticionById,
    getGoleadores,
    getPosiciones,
} from "../../api/competiciones";
import PlayerCard from "../../components/PlayerCard";
import { ScreenLayout } from "../../components/ScreenLayout";
import TeamCard from "../../components/TeamCard";
import { mockCompeticiones } from "../../lib/mockData";

export default function Stats() {
  const [competitionsData, setCompetitionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState({});

  async function loadCompetitionsData(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const competitions = [];

      for (const competicionId of mockCompeticiones) {
        try {
          // Obtener información de la competición
          const competitionInfo = await getCompeticionById(competicionId);

          // Obtener posiciones
          const positionsData = await getPosiciones(competicionId);
          console.log(`Positions data for ${competicionId}:`, positionsData);
          let topTeams = [];
          if (positionsData?.standing) {
            topTeams = positionsData.standing.slice(0, 5).map(team => ({
              ...team.team,
              position: team.position,
              points: team.points,
              playedGames: team.playedGames,
              won: team.won,
            }));
          }

          console.log(`Competition ${competicionId} - Teams:`, topTeams.length);

          // Obtener goleadores
          const scorersData = await getGoleadores(competicionId);
          let topScorers = [];
          if (scorersData?.scorers) {
            topScorers = scorersData.scorers.slice(0, 5).map(scorer => ({
              ...scorer.player,
              goals: scorer.goals,
              assists: scorer.assists || 0,
              team: scorer.team,
            }));
          }

          console.log(
            `Competition ${competicionId} - Scorers:`,
            topScorers.length
          );

          competitions.push({
            id: competicionId,
            name: competitionInfo?.name || `Competición ${competicionId}`,
            emblem: competitionInfo?.emblem,
            area: competitionInfo?.area,
            topTeams,
            topScorers,
          });
        } catch (error) {
          console.error(
            `Error loading data for competition ${competicionId}:`,
            error
          );
          // Agregar competición con datos vacíos en caso de error
          competitions.push({
            id: competicionId,
            name: `Competición ${competicionId}`,
            topTeams: [],
            topScorers: [],
          });
        }
      }

      setCompetitionsData(competitions);
    } catch (error) {
      console.error("Error loading competitions data:", error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }

  const onRefresh = () => {
    loadCompetitionsData(true);
  };

  useEffect(() => {
    loadCompetitionsData();
  }, []);

  function toggleFavorite(kind, id) {
    const key = `${kind}:${id}`;
    setFavorites(s => ({ ...s, [key]: !s[key] }));
  }
  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1 bg-transparent"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#40A578"
            colors={["#40A578"]}
          />
        }
      >
        <View className="px-4 py-6">
          {/* Header */}
          <View className="mb-8 items-center">
            <View className="p-6 bg-gradient-to-br from-[#234E47] to-[#183D3D] rounded-full mb-4 shadow-lg border-2 border-[#40A578]">
              <Text className="text-[40px]">📊</Text>
            </View>
            <Text className="text-[32px] font-bold text-[#E8F5E8] text-center leading-tight">
              Statistics
            </Text>
            <Text className="text-[16px] text-[#7BA05B] text-center mt-3 px-4 leading-relaxed">
              Mejores posiciones y goleadores por competición
            </Text>
          </View>

          {/* Loading state */}
          {loading ? (
            <View className="items-center mt-12 h-24">
              <ActivityIndicator size="large" color="#40A578" />
              <Text className="text-[#7BA05B] mt-4 text-sm">
                Cargando competiciones...
              </Text>
            </View>
          ) : (
            /* Competition sections */
            competitionsData.map((competition, compIndex) => (
              <View key={competition.id} className="mb-12">
                {/* Competition header */}
                <View className="flex-row items-center mb-6 px-1">
                  <View className="flex-row items-center flex-1">
                    {competition.emblem ? (
                      <Image
                        source={{ uri: competition.emblem }}
                        className="w-8 h-8 mr-3"
                        resizeMode="contain"
                      />
                    ) : (
                      <View className="w-8 h-8 rounded-full bg-[#40A578] items-center justify-center mr-3">
                        <Text className="text-[16px]">🏆</Text>
                      </View>
                    )}
                    <Text className="text-[#E8F5E8] font-bold text-xl">
                      {competition.name}
                    </Text>
                  </View>
                </View>

                {/* Top 5 Teams */}
                {competition.topTeams.length > 0 && (
                  <View className="mb-6">
                    <View className="flex-row items-center mb-4 px-1">
                      <View className="flex-row items-center">
                        <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                        <Text className="text-[#E8F5E8] font-bold text-lg">
                          Top 5 Posiciones
                        </Text>
                      </View>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="pl-1"
                    >
                      {competition.topTeams.map((team, index) => {
                        const id = team?.id ?? `${competition.id}-pos-${index}`;
                        return (
                          <View key={id} className="mr-4">
                            <View className="mb-2 px-2">
                              <View className="flex-row items-center gap-2">
                                <View className="w-8 h-8 rounded-full bg-[#40A578] items-center justify-center">
                                  <Text className="text-[#040D12] font-bold text-sm">
                                    {team.position || index + 1}
                                  </Text>
                                </View>
                                <Text className="text-[#7BA05B] text-xs font-medium">
                                  {team.points ? `${team.points} pts` : ""}
                                </Text>
                              </View>
                            </View>
                            <TeamCard
                              item={team}
                              favorited={!!favorites[`equipo:${id}`]}
                              onToggleFavorite={() =>
                                toggleFavorite("equipo", id)
                              }
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}

                {/* Top 5 Scorers */}
                {competition.topScorers.length > 0 && (
                  <View className="mb-6">
                    <View className="flex-row items-center mb-4 px-1">
                      <View className="flex-row items-center">
                        <View className="w-1 h-6 bg-[#FFD700] rounded-full mr-3"></View>
                        <Text className="text-[#E8F5E8] font-bold text-lg">
                          Top 5 Goleadores
                        </Text>
                      </View>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="pl-1"
                    >
                      {competition.topScorers.map((player, index) => {
                        const id =
                          player?.id ?? `${competition.id}-scorer-${index}`;
                        return (
                          <View key={id} className="mr-4">
                            <View className="mb-2 px-2">
                              <View className="flex-row items-center gap-2">
                                <View className="w-8 h-8 rounded-full bg-[#FFD700] items-center justify-center">
                                  <Text className="text-[#040D12] font-bold text-sm">
                                    {index + 1}
                                  </Text>
                                </View>
                                <Text className="text-[#7BA05B] text-xs font-medium">
                                  {player.goals ? `${player.goals} goles` : ""}
                                </Text>
                              </View>
                            </View>
                            <PlayerCard
                              item={player}
                              favorited={!!favorites[`jugador:${id}`]}
                              onToggleFavorite={() =>
                                toggleFavorite("jugador", id)
                              }
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}

                {/* Separator line between competitions (except last one) */}
                {compIndex < competitionsData.length - 1 && (
                  <View className="border-b border-[#234E47] mx-4 mb-8"></View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

/* Styles converted to Tailwind classes (className) */
