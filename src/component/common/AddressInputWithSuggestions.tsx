import { responsive } from "@/hooks/resposive";
import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const APIKEY = "AIzaSyCtg6oeRPEkRL9_CE-us3QdvXjupbgG14A"; // Replace in prod
interface AddressData {
  fullAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  placeId: string;
}
interface props {
  selectedAddress: string;
  setSelectedAddress: (address: AddressData) => void;
}
const AddressInputWithSuggestions: React.FC<props> = ({
  selectedAddress,
  setSelectedAddress,
}) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState<string>(selectedAddress || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlaceData, setSelectedPlaceData] = useState<any>(null);

  const fetchLocationSuggestions = async (input: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${APIKEY}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === "OK") {
        LayoutAnimation.easeInEaseOut();
        setSuggestions(json?.predictions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Autocomplete fetch error:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const extractAddressFields = (details: any) => {
    const components = details.address_components || [];

    const get = (type: string) =>
      components.find((comp: any) => comp.types.includes(type))?.long_name ||
      "";

    return {
      fullAddress: details.formatted_address || "",
      city:
        get("locality") ||
        get("sublocality") ||
        get("administrative_area_level_2"),
      state: get("administrative_area_level_1"),
      country: get("country"),
      postalCode: get("postal_code") || "",
      latitude: details.geometry?.location?.lat || null,
      longitude: details.geometry?.location?.lng || null,
      placeId: details.place_id || "",
    };
  };

  const getPlaceDetails = async (placeId: string) => {
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${APIKEY}`;
      const response = await fetch(detailsUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const structured = extractAddressFields(data.result);
        setSelectedAddress(structured);
        setSelectedPlaceData(structured);
      } else {
        console.warn("Error fetching place details:", data.status);
      }
    } catch (error) {
      console.error("Failed to fetch place details", error);
    }
  };

  const handleInputChange = (text: string) => {
    setAddress(text);
    if (text.length >= 2) {
      fetchLocationSuggestions(text);
    } else {
      LayoutAnimation.easeInEaseOut();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (item: any) => {
    setAddress(item.description);
    getPlaceDetails(item.place_id);
    LayoutAnimation.easeInEaseOut();
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Address <Text style={{ color: "#FF0000" }}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city or address"
        value={address}
        onChangeText={handleInputChange}
      />

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <FlatList
            nestedScrollEnabled
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* ✅ Optional debug output */}
      {/* {selectedPlaceData && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Selected Address:</Text>
          <Text style={styles.resultText}>City: {selectedPlaceData.city}</Text>
          <Text style={styles.resultText}>
            State: {selectedPlaceData.state}
          </Text>
          <Text style={styles.resultText}>
            Country: {selectedPlaceData.country}
          </Text>
          <Text style={styles.resultText}>
            Postal Code: {selectedPlaceData.postalCode}
          </Text>
          <Text style={styles.resultText}>
            Coordinates: {selectedPlaceData.latitude},{" "}
            {selectedPlaceData.longitude}
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default AddressInputWithSuggestions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: responsive.number(20),
  },
  label: {
    fontSize: responsive.fontSize(16),
    fontWeight: "600",
    marginBottom: responsive.number(8),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
  },
  suggestionBox: {
    marginTop: 4,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 180,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultBox: {
    marginTop: responsive.number(16),
    backgroundColor: "#eef6ff",
    padding: responsive.number(12),
    borderRadius: responsive.number(8),
  },
  resultTitle: {
    fontSize: responsive.fontSize(14),
    fontWeight: "600",
    marginBottom: 6,
  },
  resultText: {
    fontSize: responsive.fontSize(13),
    marginBottom: 4,
  },
});
