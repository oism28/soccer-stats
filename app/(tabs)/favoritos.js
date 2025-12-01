import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getCompeticionById } from "../../api/competiciones";
import { getEquipoById } from "../../api/equipos";
import {
  competiciones,
  equipos,
  personas,
  toggleCompeticionFavorita,
  toggleEquipoFavorito,
  togglePersonaFavorita,
} from "../../api/favoritos";
import { getPersonaById } from "../../api/personas";
import CompetitionCard from "../../components/CompetitionCard";
import PlayerCard from "../../components/PlayerCard";
import { ScreenLayout } from "../../components/ScreenLayout";
import TeamCard from "../../components/TeamCard";
export default function Favoritos() {
  const [favCompetitions, setFavCompetitions] = useState([]);
  const [favTeams, setFavTeams] = useState([]);
  const [favPlayers, setFavPlayers] = useState([]);
  const [loadingCompetitions, setLoadingCompetitions] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    loadAllFavorites();
  }, []);

  const loadAllFavorites = async () => {
    await Promise.all([
      loadFavoriteCompetitions(),
      loadFavoriteTeams(),
      loadFavoritePlayers(),
    ]);
  };

  const loadFavoriteCompetitions = async () => {
    try {
      const response = await competiciones.getFavoritas();
      console.log("Competitions response:", response);

      // Extraer los IDs de la respuesta
      const competitionIds =
        response?.favoritas || response?.data || response || [];

      if (!Array.isArray(competitionIds) || competitionIds.length === 0) {
        setFavCompetitions([]);
      } else {
        // Obtener datos completos para cada competición
        const competitionData = [];
        for (const id of competitionIds) {
          try {
            const competitionInfo = await getCompeticionById(id);
            competitionData.push(competitionInfo);
          } catch (error) {
            console.error(`Error fetching competition ${id}:`, error);
            // Agregar placeholder si falla la carga
            competitionData.push({
              id: id || Math.random(),
              name: `Competición ${id || "desconocida"}`,
            });
          }
        }

        setFavCompetitions(competitionData);

        // Marcar como favoritas en el estado local
        const favMap = {};
        competitionData.forEach(comp => {
          if (comp && comp.id) {
            favMap[`competicion:${comp.id}`] = true;
          }
        });
        setFavorites(prev => ({ ...prev, ...favMap }));
      }
    } catch (error) {
      console.error("Error loading favorite competitions:", error);
      setFavCompetitions([]);
    } finally {
      setLoadingCompetitions(false);
    }
  };

  const loadFavoriteTeams = async () => {
    try {
      const response = await equipos.getFavoritos();
      console.log("Teams response:", response);

      // Extraer los IDs de la respuesta
      const teamIds = response?.favoritos || response?.data || response || [];

      if (!Array.isArray(teamIds) || teamIds.length === 0) {
        setFavTeams([]);
      } else {
        // Obtener datos completos para cada equipo
        const teamData = [];
        for (const id of teamIds) {
          try {
            const teamInfo = await getEquipoById(id);
            teamData.push(teamInfo);
          } catch (error) {
            console.error(`Error fetching team ${id}:`, error);
            // Agregar placeholder si falla la carga
            teamData.push({
              id: id || Math.random(),
              name: `Equipo ${id || "desconocido"}`,
            });
          }
        }

        setFavTeams(teamData);

        // Marcar como favoritos en el estado local
        const favMap = {};
        teamData.forEach(team => {
          if (team && team.id) {
            favMap[`equipo:${team.id}`] = true;
          }
        });
        setFavorites(prev => ({ ...prev, ...favMap }));
      }
    } catch (error) {
      console.error("Error loading favorite teams:", error);
      setFavTeams([]);
    } finally {
      setLoadingTeams(false);
    }
  };

  const loadFavoritePlayers = async () => {
    try {
      const response = await personas.getFavoritos();
      console.log("Players response:", response);

      // Extraer los IDs de la respuesta
      const playerIds = response?.favoritos || response?.data || response || [];

      if (!Array.isArray(playerIds) || playerIds.length === 0) {
        setFavPlayers([]);
      } else {
        // Obtener datos completos para cada jugador
        const playerData = [];
        for (const id of playerIds) {
          try {
            const playerInfo = await getPersonaById(id);
            playerData.push(playerInfo);
          } catch (error) {
            console.error(`Error fetching player ${id}:`, error);
            // Agregar placeholder si falla la carga
            playerData.push({
              id: id || Math.random(),
              name: `Jugador ${id || "desconocido"}`,
            });
          }
        }

        setFavPlayers(playerData);

        // Marcar como favoritos en el estado local
        const favMap = {};
        playerData.forEach(player => {
          if (player && player.id) {
            favMap[`jugador:${player.id}`] = true;
          }
        });
        setFavorites(prev => ({ ...prev, ...favMap }));
      }
    } catch (error) {
      console.error("Error loading favorite players:", error);
      setFavPlayers([]);
    } finally {
      setLoadingPlayers(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAllFavorites();
    setRefreshing(false);
  };

  const toggleFavorite = async (kind, id) => {
    const key = `${kind}:${id}`;
    const wasFavorited = favorites[key];

    // Actualizar estado local inmediatamente para feedback visual
    setFavorites(prev => ({ ...prev, [key]: !wasFavorited }));

    try {
      if (kind === "competicion") {
        await toggleCompeticionFavorita(id);
        await loadFavoriteCompetitions();
      } else if (kind === "equipo") {
        await toggleEquipoFavorito(id);
        await loadFavoriteTeams();
      } else if (kind === "jugador") {
        await togglePersonaFavorita(id);
        await loadFavoritePlayers();
      }
    } catch (error) {
      console.error(`Error toggling ${kind} favorite:`, error);
      // Revertir el cambio en caso de error
      setFavorites(prev => ({ ...prev, [key]: wasFavorited }));
    }
  };

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
              <Text className="text-[40px]">❤️</Text>
            </View>
            <Text className="text-[32px] font-bold text-[#E8F5E8] text-center leading-tight">
              Mis Favoritos
            </Text>
            <Text className="text-[16px] text-[#7BA05B] text-center mt-3 px-4 leading-relaxed">
              Competiciones, equipos y jugadores que sigues
            </Text>
          </View>

          {/* Favorite Teams */}
          {loadingTeams ? (
            <View className="items-center mt-12 h-24">
              <ActivityIndicator size="large" color="#40A578" />
              <Text className="text-[#7BA05B] mt-4 text-sm">
                Cargando equipos favoritos...
              </Text>
            </View>
          ) : favTeams.length > 0 ? (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Equipos Favoritos
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pl-1"
              >
                {favTeams.map((team, index) => (
                  <TeamCard
                    key={team?.id || `team-${index}`}
                    item={team}
                    favorited={!!favorites[`equipo:${team.id}`]}
                    onToggleFavorite={() => toggleFavorite("equipo", team.id)}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Equipos Favoritos
                  </Text>
                </View>
              </View>
              <View className="bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-8 items-center border border-[#2A5750] shadow-xl">
                <Text className="text-[36px]">⚽</Text>
                <Text className="text-[#E8F5E8] font-bold text-lg mt-3">
                  No hay equipos favoritos
                </Text>
                <Text className="text-[#7BA05B] text-sm mt-2 text-center">
                  Agrega equipos desde la pantalla de estadísticas
                </Text>
              </View>
            </View>
          )}

          {/* Favorite Players */}
          {loadingPlayers ? (
            <View className="items-center mt-12 h-24">
              <ActivityIndicator size="large" color="#40A578" />
              <Text className="text-[#7BA05B] mt-4 text-sm">
                Cargando jugadores favoritos...
              </Text>
            </View>
          ) : favPlayers.length > 0 ? (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Jugadores Favoritos
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pl-1"
              >
                {favPlayers.map((player, index) => (
                  <PlayerCard
                    key={player?.id || `player-${index}`}
                    item={player}
                    favorited={!!favorites[`jugador:${player.id}`]}
                    onToggleFavorite={() =>
                      toggleFavorite("jugador", player.id)
                    }
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Jugadores Favoritos
                  </Text>
                </View>
              </View>
              <View className="bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-8 items-center border border-[#2A5750] shadow-xl">
                <Text className="text-[36px]">👤</Text>
                <Text className="text-[#E8F5E8] font-bold text-lg mt-3">
                  No hay jugadores favoritos
                </Text>
                <Text className="text-[#7BA05B] text-sm mt-2 text-center">
                  Agrega jugadores desde la pantalla de estadísticas
                </Text>
              </View>
            </View>
          )}
          {/* Favorite Competitions */}
          {loadingCompetitions ? (
            <View className="items-center mt-12 h-24">
              <ActivityIndicator size="large" color="#40A578" />
              <Text className="text-[#7BA05B] mt-4 text-sm">
                Cargando competiciones favoritas...
              </Text>
            </View>
          ) : favCompetitions.length > 0 ? (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Competiciones Favoritas
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pl-1"
              >
                {favCompetitions.map((competition, index) => (
                  <CompetitionCard
                    key={competition?.id || `competition-${index}`}
                    item={competition}
                    favorited={!!favorites[`competicion:${competition.id}`]}
                    onToggleFavorite={() =>
                      toggleFavorite("competicion", competition.id)
                    }
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className="mb-8">
              <View className="flex-row items-center mb-4 px-1">
                <View className="flex-row items-center">
                  <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
                  <Text className="text-[#E8F5E8] font-bold text-lg">
                    Competiciones Favoritas
                  </Text>
                </View>
              </View>
              <View className="bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-8 items-center border border-[#2A5750] shadow-xl">
                <Text className="text-[36px]">🏆</Text>
                <Text className="text-[#E8F5E8] font-bold text-lg mt-3">
                  No hay competiciones favoritas
                </Text>
                <Text className="text-[#7BA05B] text-sm mt-2 text-center">
                  Agrega competiciones desde la pantalla de estadísticas
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

/* Styles converted to Tailwind classes (className) */
