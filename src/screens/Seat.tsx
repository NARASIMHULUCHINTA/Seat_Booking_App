
import React, { Component, useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Tooltip from 'react-native-walkthrough-tooltip';


var deviceWidth = Dimensions.get('window').width;
const SeatBookingApp = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSeat, setSelectedSeat] = useState(null); 
    const [toolTipVisible, setToolTipVisible] = useState(false);

    const [row1, setRow1] = useState([
        { seatno:"L1",empty: true, selected: false, isWomenOnly: false,price:'2999'},
        { seatno:"L2", empty: false, selected: false, isWomenOnly: false,price:'2999' },
        { seatno:"L3",empty: true, selected: false, isWomenOnly: true,price:'2999' },
        { seatno:"L4",empty: true, selected: false, isWomenOnly: false,price:'2999' },
        { seatno:"L5",empty: true, selected: false, isWomenOnly: true ,price:'2999'},
    ]);
    const [row2, setRow2] = useState([
        { seatno:"L6",empty: false, selected: false, isWomenOnly: false ,price:'1999'},
        { seatno:"L7", empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"L8",empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"L9",empty: false, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"L10",empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"L11",empty: true, selected: false, isWomenOnly: true,price:'1999' },
        { seatno:"L12",empty: false, selected: false, isWomenOnly: true,price:'1999' },
        { seatno:"L13",empty: true, selected: false, isWomenOnly: false ,price:'1999'},
        { seatno:"L14",empty: false, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"L15",empty: true, selected: false, isWomenOnly: true,price:'1999' },
    ]);

    const [row3, setRow3] = useState([
        { seatno:"U1",empty: true, selected: false, isWomenOnly: false,price:'2999' },
        { seatno:"U2", empty: false, selected: false, isWomenOnly: false,price:'2999' },
        { seatno:"U3",empty: true, selected: false, isWomenOnly: true,price:'2999' },
        { seatno:"U4",empty: true, selected: false, isWomenOnly: false,price:'2999' },
        { seatno:"U5",empty: true, selected: false, isWomenOnly: true,price:'2999' },
    ]);
    const [row4, setRow4] = useState([
        { seatno:"U6",empty: false, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U7", empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U8",empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U9",empty: false, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U10",empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U11",empty: true, selected: false, isWomenOnly: true,price:'1999' },
        { seatno:"U12",empty: false, selected: false, isWomenOnly: true,price:'1999' },
        { seatno:"U13",empty: true, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U14",empty: false, selected: false, isWomenOnly: false,price:'1999' },
        { seatno:"U15",empty: true, selected: false, isWomenOnly: true,price:'1999' },
    ]);

    const seatTypes = [
        { imageSource: require("../assets/busseat.png"), tintColor: 'green', text: 'Available' },
        { imageSource: require("../assets/busseat.png"), tintColor: '#FA00FF', text: 'Available only for women' },
        { imageSource: require("../assets/busseat.png"), backgroundColor: 'green', text: 'Selected by you' },
        { imageSource: require("../assets/busseat.png"), backgroundColor: '#8e8e8e', text: 'Booked by others' },
        { imageSource: require("../assets/busseat.png"), tintColor: '#FA00FF', backgroundColor: '#8e8e8e', text: 'Booked by female passengers' },
    ];

    const onSelectRow = (index, row, setRow) => {
        let tempRow = [...row];
        tempRow.map((item, ind) => {
            if (index === ind) {
                if (item.selected) {
                    item.selected = false;
                    item.empty = true;
                    setSelectedSeats((seats) => seats.filter(seat => seat !== item.seatno));
                    setTotalPrice(totalPrice - parseFloat(item.price));
                    setSelectedSeat(null); 
                } else {
                    item.selected = true;
                    item.empty = false;
                    setSelectedSeats((seats) => [...seats, item.seatno]);
                    setTotalPrice(totalPrice + parseFloat(item.price));
                    setSelectedSeat(item);
                }
            }
        });
        setToolTipVisible(false);

        setRow(tempRow);
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Ionicons name='arrow-back' size={24}  style={styles.arrow}/>
                <Text style={styles.headingtext}>Bus Travels</Text>
            </View>
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.seatdetailcontainer}>
                <View style={styles.seattypes}>
                    <Text style={styles.seattext}>Know about seat types</Text>
                    <Ionicons name='information-circle-outline' size={24} style={styles.arrow} />
                </View>
                <View>
                    {seatTypes.map((seatType, index) => (
                        <View key={index} style={styles.rowcontainer}>
                            <Image source={seatType.imageSource} style={[styles.seattypeimage, { tintColor: seatType.tintColor, backgroundColor: seatType.backgroundColor }]} />
                            <Text style={[styles.seattext, styles.seattypetext]}>{seatType.text}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.buscontainer}>
            <Text style={styles.bustext}>Lower deck</Text>
                     <View style={styles.sleeperseats}>        
                        <View>
                            <FlatList
                                data={row1}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Tooltip
                                        isVisible={toolTipVisible && selectedSeat === item} 
                                            content={
                                                    <Text style={styles.tooltipText}>₹ {item.price}</Text>
                                            }
                                            placement="left"
                                            onClose={() => {
                                                setToolTipVisible(false);
                                            }}
                                            backgroundColor='transparent'    
                                        >
                                        <TouchableOpacity style={{ margin: 2 }} onPress={() => {
                                            if (item.selected === false && item.empty === false) {
                                                alert('Already booked');
                                            } else {
                                                onSelectRow(index, row1, setRow1);
                                                setToolTipVisible(true); 
                                            }
                                        }}>
                                            
                                            <Image
                                                source={require("../assets/busseat.png")}
                                                style={[
                                                    styles.seat,
                                                    item.isWomenOnly ? { tintColor: '#FA00FF' } : null,
                                                    { backgroundColor: item.selected ? 'green' : item.empty ? 'transparent' : '#8e8e8e' },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        </Tooltip>
                                    );
                                }}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={row2}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Tooltip
                                        isVisible={toolTipVisible && selectedSeat === item}
                                            content={
                                                    <Text style={styles.tooltipText}>₹ {item.price}</Text>
                                            }
                                            placement="left"
                                            onClose={() => {
                                                setToolTipVisible(false);
                                            }}
                                            backgroundColor='transparent'    
                                        >
                                        <TouchableOpacity style={{ margin: 2 }} onPress={() => {
                                            if (item.selected === false && item.empty === false) {
                                                alert('Already booked');
                                            } else {
                                                onSelectRow(index, row2, setRow2);
                                                setToolTipVisible(true);
                                            }
                                        }}>
                                            <Image
                                                source={require("../assets/busseat.png")}
                                                style={[
                                                    styles.seat,
                                                    item.isWomenOnly ? { tintColor: '#FA00FF' } : null,
                                                    { backgroundColor: item.selected ? 'green' : item.empty ? 'transparent' : '#8e8e8e' },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        </Tooltip>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buscontainer}>
                <Text style={styles.bustext}>Lower deck</Text>
                    <View style={styles.sleeperseats}>
                        <View>
                            <FlatList
                                data={row3}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Tooltip
                                        isVisible={toolTipVisible && selectedSeat === item}
                                            content={
                                                    <Text style={styles.tooltipText}>₹ {item.price}</Text>
                                            }
                                            placement="left"
                                            onClose={() => {
                                                setToolTipVisible(false);
                                            }}
                                            backgroundColor='transparent'    
                                        >
                                        <TouchableOpacity style={{ margin: 2 }} onPress={() => {
                                            if (item.selected === false && item.empty === false) {
                                                alert('Already booked');
                                            } else {
                                                onSelectRow(index, row3, setRow3);
                                                setToolTipVisible(true);
                                            }
                                        }}>
                                            <Image
                                                source={require("../assets/busseat.png")}
                                                style={[
                                                    styles.seat,
                                                    item.isWomenOnly ? { tintColor: '#FA00FF' } : null,
                                                    { backgroundColor: item.selected ? 'green' : item.empty ? 'transparent' : '#8e8e8e' },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        </Tooltip>
                                    );
                                }}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={row4}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Tooltip
                                        isVisible={toolTipVisible && selectedSeat === item}
                                        content={
                                                <Text style={styles.tooltipText}>₹ {item.price}</Text>
                                        }
                                        placement="left"
                                        onClose={() => {
                                            setToolTipVisible(false);
                                        }}
                                        backgroundColor='transparent'    
                                    >
                                        <TouchableOpacity style={{ margin: 2 }} onPress={() => {
                                            if (item.selected === false && item.empty === false) {
                                                alert('Already booked');
                                            } else {
                                                onSelectRow(index, row4, setRow4);
                                                setToolTipVisible(true);
                                            }
                                        }}>
                                            <Image
                                                source={require("../assets/busseat.png")}
                                                style={[
                                                    styles.seat,
                                                    item.isWomenOnly ? { tintColor: '#FA00FF' } : null,
                                                    { backgroundColor: item.selected ? 'green' : item.empty ? 'transparent' : '#8e8e8e' },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        </Tooltip>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </View>
        </ScrollView>
        <View style={styles.bottomcontainer}>
            <View style={styles.pricecontainer}>
                <Text style={styles.pricetext}>No of seats: {selectedSeats.length} | {selectedSeats.join(', ')} </Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.pricetext}>₹ {totalPrice}</Text>
                    <Feather name='plus-circle' size={20} color={'#000'}/>
                </View>
            </View>
            <TouchableOpacity style={styles.paybutton}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5",
      },
      tooltipText: {
        color: 'black',
        fontSize: 10,
    },

      bustext:{
        textAlign:'center',
        fontSize:18,
        color:'#000',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:'#000',  
        paddingVertical:10,      
      },
      buscontainer: {
        width:deviceWidth-100,
        marginTop:30,
        marginHorizontal:20,
        height: '75%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#8e8e8e',
    },
    seattypes:{
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:'#000',  
        paddingVertical:10
    },
    seattext:{
        fontSize:18,
        color:'#000',
    },
    seattypeimage:{
        width: 25,
        height: 50,
        margin:10,
    },
    rowcontainer:{
        flexDirection:'row',
    },
    sleeperseats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:10,
    },
    seat: {
        width: 33,
        height: 66,
        margin:2,
        tintColor:'green'
    },
    seattypetext:{
        fontSize:14,
        alignSelf:'center',
        marginLeft:10,
        width:'70%',
    },
    row: {
        flexDirection: 'row', 
        marginTop: 20,
        borderBottomColor: '#000',
        paddingBottom:10,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      arrow: {
        color:'#000',
        marginLeft:5,
        alignSelf:'center'
      },
      headingtext:{
        fontSize: 20,
        marginLeft:20,
        color:'#000',
      },
      seatdetailcontainer:{
        width:deviceWidth-120,
        marginTop:30,
        marginHorizontal:20,
        height: '70%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#8e8e8e',
      },
      bottomcontainer:{
        
      },
      pricecontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth:5,
        borderColor:'#8e8e8e',
        
      },
      pricetext:{
        color:'#000',
        fontSize:14,
        marginRight:10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
    },
    paybutton: {
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: deviceWidth,
        height: 48,
        backgroundColor: 'blue',
    },
});

export default SeatBookingApp;
