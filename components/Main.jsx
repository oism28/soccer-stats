import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CompetitionCard from "./CompetitionCard";
import PlayerCard from "./PlayerCard";
import TeamCard from "./TeamCard";

import { mockCompeticiones, mockEquipos, mockJugadores } from "../lib/mockData";

import { getCompeticionById } from "../api/competiciones";
import { getEquipoById } from "../api/equipos";
import { getPersonaById } from "../api/personas";

export function Main() {
  const router = useRouter();
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loadingCompetitions, setLoadingCompetitions] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    let mounted = true;

    async function loadCompetitions() {
      try {
        const compRes = [];
        for (const id of mockCompeticiones) {
          try {
            const res = await getCompeticionById(id);
            compRes.push(res);
          } catch {
            compRes.push({ id, name: `Competición ${id}` });
          }
        }
        if (mounted) setCompetitions(compRes);
      } finally {
        if (mounted) setLoadingCompetitions(false);
      }
    }

    async function loadTeams() {
      try {
        const teamRes = [];
        for (const id of mockEquipos) {
          try {
            const res = await getEquipoById(id);
            teamRes.push(res);
          } catch {
            teamRes.push({ id, name: `Equipo ${id}` });
          }
        }
        if (mounted) setTeams(teamRes);
      } finally {
        if (mounted) setLoadingTeams(false);
      }
    }

    async function loadPlayers() {
      try {
        const playerRes = [];
        for (const id of mockJugadores) {
          try {
            const res = await getPersonaById(id);
            playerRes.push(res);
          } catch {
            playerRes.push({ id, name: `Jugador ${id}` });
          }
        }
        if (mounted) setPlayers(playerRes);
      } finally {
        if (mounted) setLoadingPlayers(false);
      }
    }

    loadCompetitions();
    loadTeams();
    loadPlayers();

    return () => {
      mounted = false;
    };
  }, []);

  function toggleFavorite(kind, id) {
    const key = `${kind}:${id}`;
    setFavorites(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <ScrollView className="flex-1 bg-[#040D12] px-4 py-6">
      <View className="mb-8 items-center">
        <View className="p-6 bg-gradient-to-br from-[#234E47] to-[#183D3D] rounded-full mb-4 shadow-lg border-2 border-[#40A578]">
          <Text className="text-[40px]">🏆</Text>
        </View>
        <Text className="text-[32px] font-bold text-[#E8F5E8] text-center leading-tight">
          Soccer Stats Pro
        </Text>
        <Text className="text-[16px] text-[#7BA05B] text-center mt-3 px-4 leading-relaxed">
          Resumen rápido — competiciones, jugadores y equipos destacados
        </Text>
      </View>

      {loadingCompetitions ? (
        <View className="items-center mt-12 h-24">
          <ActivityIndicator size="large" color="#40A578" />
          <Text className="text-[#7BA05B] mt-4 text-sm">
            Cargando competiciones...
          </Text>
        </View>
      ) : (
        <View className="mb-8">
          <View className="flex-row items-center mb-4 px-1 justify-between">
            <View className="flex-row items-center">
              <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
              <Text className="text-[#E8F5E8] font-bold text-lg">
                Competiciones
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/competiciones")}
              className="px-3 py-1 rounded-full border border-[#234E47] bg-[#0F2624]"
            >
              <Text className="text-[#7BA05B] text-sm">Ver todo</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-1"
          >
            {competitions.map((c, i) => {
              const id = c?.id ?? `comp-${i}`;
              return (
                <CompetitionCard
                  key={id}
                  item={c}
                  favorited={!!favorites[`competicion:${id}`]}
                  onToggleFavorite={() => toggleFavorite("competicion", id)}
                />
              );
            })}
          </ScrollView>
        </View>
      )}

      {loadingTeams ? (
        <View className="items-center mt-12 h-24">
          <ActivityIndicator size="large" color="#40A578" />
          <Text className="text-[#7BA05B] mt-4 text-sm">
            Cargando equipos...
          </Text>
        </View>
      ) : (
        <View className="mb-8">
          <View className="flex-row items-center mb-4 px-1 justify-between">
            <View className="flex-row items-center">
              <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
              <Text className="text-[#E8F5E8] font-bold text-lg">Equipos</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/equipos")}
              className="px-3 py-1 rounded-full border border-[#234E47] bg-[#0F2624]"
            >
              <Text className="text-[#7BA05B] text-sm">Ver todo</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-1"
          >
            {teams.map((t, i) => {
              const id = t?.id ?? `team-${i}`;
              return (
                <TeamCard
                  key={id}
                  item={t}
                  favorited={!!favorites[`equipo:${id}`]}
                  onToggleFavorite={() => toggleFavorite("equipo", id)}
                />
              );
            })}
          </ScrollView>
        </View>
      )}

      {loadingPlayers ? (
        <View className="items-center mt-12 h-24">
          <ActivityIndicator size="large" color="#40A578" />
          <Text className="text-[#7BA05B] mt-4 text-sm">
            Cargando jugadores...
          </Text>
        </View>
      ) : (
        <View className="mb-8">
          <View className="flex-row items-center mb-4 px-1">
            <View className="flex-row items-center">
              <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
              <Text className="text-[#E8F5E8] font-bold text-lg">
                Jugadores
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-1"
          >
            {players.map((p, i) => {
              const id = p?.id ?? `player-${i}`;
              return (
                <PlayerCard
                  key={id}
                  item={p}
                  favorited={!!favorites[`jugador:${id}`]}
                  onToggleFavorite={() => toggleFavorite("jugador", id)}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

export default Main;
