import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import _styles from "../styles/Styles";
import styles from "../screens/home/styles";
import icons from "../styles/icons";

import { Routes } from "../utils/Routes";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  BrandName,
  BrandNameArr,
  ColorArr,
  CustomerReview,
  CustomerReviewArr,
} from "../constants/Data";
import Button from "./common/Button";
import Icons from "../styles/icons";
import { CallApi_GET, CallApi_Without_Token } from "../apis/ApiRequest";
import {
  api_get_filter_content,
  api_post_filter_product,
} from "../apis/ApiEndPoint";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width * 0.85;

const FilterModal: React.FC<any> = forwardRef(
  ({ isVisible, setisVisible, getData, filterCount }, ref) => {
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
    const [priceValue, setPriceValue] = useState<any>([0, 10]);
    const [brandResArr, setBrandResArr] = useState<any>([]);
    const [selectedBrandsIndex, setSelectedBrandsIndex] = useState<string[]>(
      []
    );
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number[]>([]);
    const [selectedReviewIndex, setSelectedReviewIndex] = useState<string[]>(
      []
    );
    const [isPriceRangeChage, setIspriceRangeChage] = useState<boolean>(false);
    const navigation = useNavigation();

    const fetchFilterContent = () => {
      try {
        CallApi_GET(api_get_filter_content).then((data) => {
          console.log("data", data);
          if (data?.status === "success") {
            setBrandResArr([...data?.result?.brand_name]);
            setPriceValue([...Object.values(data?.result?.price)]);
          } else {
            console.log("error");
          }
        });
      } catch (error) {
        console.log("error", error);

        fetchFilterContent();
      }
    };
    // Expose it to parent
    useImperativeHandle(ref, () => ({
      fetchFilterContent,
    }));

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        fetchFilterContent();
      });

      return unsubscribe;
    }, [navigation]);

    const toggleBrandSelection = (id: string) => {
      const isSelected = selectedBrandsIndex.includes(id);

      if (isSelected) {
        setSelectedBrandsIndex(selectedBrandsIndex.filter((i) => i !== id));
      } else {
        setSelectedBrandsIndex([...selectedBrandsIndex, id]);
      }
    };

    const toggleColorSelection = (index: number) => {
      const isSelected = selectedColorIndex.includes(index);

      if (isSelected) {
        setSelectedColorIndex(selectedColorIndex.filter((i) => i !== index));
      } else {
        setSelectedColorIndex([...selectedColorIndex, index]);
      }
    };

    const toggleReviewSelection = (id: string) => {
      const isSelected = selectedReviewIndex.includes(id);

      if (isSelected) {
        setSelectedReviewIndex(selectedReviewIndex.filter((i) => i !== id));
      } else {
        setSelectedReviewIndex([...selectedReviewIndex, id]);
      }
    };

    const onPressClearAll = () => {
      setSelectedBrandsIndex([]);
      setSelectedColorIndex([]);
      setSelectedReviewIndex([]);
      setIspriceRangeChage(false);
      setSelectedPriceRange([]);
    };

    const onPressApply = () => {
      try {
        let payload = {
          brand_name: selectedBrandsIndex,
          from_price: selectedPriceRange[0],
          to_price: selectedPriceRange[1],
          rating: selectedReviewIndex,
        };

        let count = 0;
        if (
          Array.isArray(payload?.brand_name) &&
          payload?.brand_name.length > 0
        )
          count++;
        if (Array.isArray(payload?.rating) && payload?.rating.length > 0)
          count++;
        if (isPriceRangeChage) count++;
        CallApi_Without_Token(api_post_filter_product, payload)
          .then((data) => {
            if (data?.status === "success") {
              console.log("success", data);
              getData(data?.result);

              filterCount(count);
              setisVisible();
            } else {
              console.log("error", data);
              getData([]);
              setisVisible();
              filterCount(count);
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      } catch (error) {
        console.log("error", error);
      }
    };

    const renderItem = ({
      item,
      index,
    }: {
      item: BrandName;
      index: number;
    }) => (
      <View>
        <TouchableOpacity
          style={[
            styles.filterOptionContainer,
            selectedBrandsIndex.includes(item?.id) && styles.selectedBrand, // Apply selected style if the brand is selected
          ]}
          onPress={() => toggleBrandSelection(item?.id)}
        >
          <Text
            style={[
              styles.oPrice,
              {
                color: selectedBrandsIndex.includes(item?.id)
                  ? "#FFF"
                  : "#FF0000",
              },
            ]}
          >
            {item?.brand_name}
          </Text>
        </TouchableOpacity>
        {selectedBrandsIndex.includes(item?.id) && ( // Show the cross icon if the brand is selected
          <View style={[styles.filterCross, { top: 0 }]}>
            <Icons.CrossBack height={7} width={7} />
          </View>
        )}
      </View>
    );

    const renderReviewItem = ({
      item,
      index,
    }: {
      item: CustomerReview;
      index: number;
    }) => (
      <TouchableOpacity
        style={[
          styles.filterOptionContainer,
          _styles.rowCenter,
          {
            backgroundColor: selectedReviewIndex.includes(item?.id)
              ? "#FF0000"
              : "#FCE2E2",
          },
        ]}
        onPress={() => toggleReviewSelection(item?.id)}
      >
        {Array.from({ length: item.star }).map((_, index1) => (
          <View key={index1} style={{ marginHorizontal: 1 }}>
            {selectedReviewIndex.includes(item?.id) ? (
              <Icons.FilterStarWhite />
            ) : (
              <Icons.FilterStarRed />
            )}
          </View>
        ))}

        {selectedReviewIndex.includes(item?.id) && ( // Show the cross icon if the brand is selected
          <View style={[styles.filterCross, { top: -10 }]}>
            <Icons.CrossBack height={7} width={7} />
          </View>
        )}
      </TouchableOpacity>
    );

    return (
      <Modal
        visible={isVisible}
        presentationStyle="pageSheet"
        animationType="slide"
      >
        <SafeAreaView style={_styles.container}>
          <View
            style={[
              _styles.container,
              styles.lContainer,
              { paddingHorizontal: "5%" },
            ]}
          >
            {/* Header component */}
            <View style={[_styles.rowSpace, { width: "100%" }]}>
              <TouchableOpacity
                style={_styles.rowCenter}
                onPress={() => {
                  setisVisible(false);
                }}
              >
                <Icons.CrossBack />
                <Text style={[_styles.headerText, { marginHorizontal: "10%" }]}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: "5%" }}>
              <Text style={styles.nameTxt}>Brand</Text>

              <FlatList
                scrollEnabled={false}
                data={brandResArr}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3} // Adjust the number of columns as needed
              />

              {/* <Text style={[styles.nameTxt, { marginVertical: "5%" }]}>
              Color
            </Text>

            <View style={[_styles.rowCenter]}>
              {ColorArr.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorView,
                    {
                      backgroundColor: item.color,
                      borderColor: selectedColorIndex.includes(index)
                        ? "#FF0000"
                        : undefined,
                      borderWidth: selectedColorIndex.includes(index)
                        ? 1
                        : undefined,
                    },
                  ]}
                  onPress={() => toggleColorSelection(index)}
                >
                  {selectedColorIndex.includes(index) && (
                    <View style={styles.filterCross}>
                      <Icons.CrossBack height={7} width={7} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View> */}

              <Text style={[styles.nameTxt, { marginVertical: "5%" }]}>
                Price
              </Text>

              <View style={{ paddingHorizontal: "3%" }}>
                <MultiSlider
                  values={[...priceValue]}
                  min={
                    Math.min(
                      ...(Array.isArray(priceValue) ? priceValue : [1])
                    ) || 1
                  }
                  max={
                    Math.max(
                      ...(Array.isArray(priceValue) ? priceValue : [10000])
                    ) || 10000
                  }
                  isMarkersSeparated={true}
                  onValuesChangeFinish={(value) => {
                    console.log("value", value);
                    setIspriceRangeChage(true);
                    setSelectedPriceRange([...value]);
                  }}
                  customMarkerLeft={(e) => (
                    <View style={styles.sliderCustomContainer}>
                      <View style={styles.sliderDot} />
                      <Text style={styles.sliderValueText}>
                        ${e.currentValue}
                      </Text>
                    </View>
                  )}
                  customMarkerRight={(e) => (
                    <View style={styles.sliderCustomContainer}>
                      <View style={styles.sliderDot} />
                      <Text style={styles.sliderValueText}>
                        ${e.currentValue}
                      </Text>
                    </View>
                  )}
                  sliderLength={300}
                  trackStyle={{ backgroundColor: "#FCE2E2" }}
                  selectedStyle={{ backgroundColor: "#FF0000" }}
                />
              </View>

              <Text style={[styles.nameTxt, { marginVertical: "5%" }]}>
                Customer Review
              </Text>

              <FlatList
                scrollEnabled={false}
                data={CustomerReviewArr}
                renderItem={renderReviewItem}
                keyExtractor={(item) => item.id}
                numColumns={3} // Adjust the number of columns as needed
              />
            </View>
            <View
              style={[
                _styles.rowSpace,
                {
                  marginTop: "10%",
                  position: "absolute",
                  bottom: 0,
                  alignSelf: "center",
                  width: "100%",
                },
              ]}
            >
              <View
                style={{
                  width: "45%",
                }}
              >
                <Button
                  btnText={"Clear All"}
                  onPress={() => onPressClearAll()}
                  color={"#FCE2E2"}
                  txtColor={"#FF0000"}
                />
              </View>
              <View
                style={{
                  width: "45%",
                }}
              >
                <Button
                  btnText={"Apply Filters"}
                  onPress={() => {
                    onPressApply();
                  }}
                  color={"#FF0000"}
                  txtColor={"#fff"}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
);

export default FilterModal;

// const styles = StyleSheet.create({});
