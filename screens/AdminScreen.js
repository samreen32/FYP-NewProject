import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../Styles/globalStyles";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";


export default function AdminScreen() {
  return (
    <View style={globalStyles.adminMain}>
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(6), width: responsiveWidth(10) },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer("CitizenDrawer");
          }}
        >
          <Ionicons name="menu" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(85) },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Ionicons name="notifications" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places");
          }}
        >
          <Text style={globalStyles.locationTop_Text}>
            Blue Area, Islamabad
          </Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.tw_ProfileGroup2}>
        <View>
          <Text style={globalStyles.tw_Profile_Name}>Hi, Jhon</Text>
        </View>
        <View>
          <Text style={globalStyles.tw_Profile_goodMorning}>Good Morning</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.easeTraffic_Rect}></View>
      <View>
        <Text style={globalStyles.letsEase_theTraffic}>
          It's easy to manage.
        </Text>
      </View>
      <View style={globalStyles.viewPlaces_btn}>
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Text style={globalStyles.viewPlaces_Text}>Manage Challan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.remove_warden_Rect}></View>
      <View style={globalStyles.remove_warden}>
        <TouchableOpacity>
          <Text style={globalStyles.remove_warden_text}>Remove Warden</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.viewPlaces_Rect}></View>
      <View style={globalStyles.viewPlaces}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places");
          }}
        >
          <Text style={globalStyles.viewPlaces_Text}>View Places</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.manageComplaints_Rect}></View>
      <View style={globalStyles.manageComplaints}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("");
          }}
        >
          <Text style={globalStyles.manageComplaints_Text}>
            Manage Complaints
          </Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.manageChallan_Rect}></View>
      <View style={globalStyles.manageChallan}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("");
          }}
        >
          <Text style={globalStyles.manageChallan_Text}>Remove Warden</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
