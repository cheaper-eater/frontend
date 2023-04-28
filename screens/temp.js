/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";

const RadioButton1 = ({
  data,
  style,
  boxStyle,
  textStyle,
  initial = -1,
  circleSize = 18,
  selectedBtn = () => {},
  activeColor = "#03a9f4",
  deactiveColor = "#e2e2e2",
  boxActiveBgColor = "#e1f5fe33",
  boxDeactiveBgColor = "#fff",
  textColor = "#383838",
  box = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (activeIndex === -1 && initial > 0) {
      const initialActive = initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (initial !== prevProps.initial) {
      const initialActive = this.props.initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (this.props.animationTypes !== prevProps.animationTypes) {
      this._checkAnimatons();
    }
  });
};

class RadioButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: -1,
    };

    this._changeRadio = this._changeRadio.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.activeIndex === -1 && this.props.initial > 0) {
      const initialActive = this.props.initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (this.props.initial !== prevProps.initial) {
      const initialActive = this.props.initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (this.props.animationTypes !== prevProps.animationTypes) {
      this._checkAnimatons();
    }
  }

  _checkAnimatons() {
    const { animationTypes } = this.props;

    this.setState({ animations: [] });
    const newAnim = [];
    animationTypes &&
      animationTypes.map((item) => {
        const itm = this.animations.find((e) => e.name === item);
        if (itm) {
          newAnim.push(itm.animation);
        }
      });
    this.setState({ animations: newAnim });
  }

  _changeRadio(item, activeIndex) {
    this.setState({ activeIndex });
    if (activeIndex !== this.state.activeIndex) {
      this.fadeInAnimation();
    }
    this.props.selectedBtn(item);
  }

  render() {
    let { activeIndex } = this.state;
    let {
      boxStyle,
      style,
      circleSize,
      textStyle,
      data,
      icon,
      activeColor,
      deactiveColor,
      boxActiveBgColor,
      boxDeactiveBgColor,
      box,
      textColor,
    } = this.props;

    return (
      <View style={style}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                box ? styles.productBox : styles.productBoxLess,
                box && {
                  backgroundColor:
                    activeIndex === index
                      ? boxActiveBgColor
                      : boxDeactiveBgColor,
                  borderColor:
                    activeIndex === index ? activeColor : deactiveColor,
                },
                boxStyle,
              ]}
              activeOpacity={0.9}
              onPress={() => this._changeRadio(item, index)}
            >
              <View style={styles.leftProductBox}>
                <View
                  style={[
                    icon ? styles.icon : styles.circle,
                    {
                      borderColor:
                        activeIndex === index ? activeColor : deactiveColor,
                      width: circleSize + 8,
                      height: circleSize + 8,
                    },
                    icon && {
                      borderColor:
                        activeIndex === index ? "transparent" : deactiveColor,
                    },
                  ]}
                >
                  <View
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                  >
                    <View>
                      {icon ? (
                        icon
                      ) : (
                        <View
                          style={[
                            styles.circleFill,
                            {
                              backgroundColor:
                                activeIndex === index
                                  ? activeColor
                                  : deactiveColor,
                              borderColor:
                                activeIndex === index
                                  ? activeColor
                                  : deactiveColor,
                              width: circleSize,
                              height: circleSize,
                            },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.centerProductBox]}>
                <Text
                  style={[
                    {
                      color: textColor,
                    },
                    textStyle,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productBox: {
    flexDirection: "row",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  productBoxLess: {
    flexDirection: "row",
    marginTop: 10,
  },
  leftProductBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerProductBox: {
    flex: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 4,
  },
  circle: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    borderWidth: 1,
    borderRadius: 10000,
  },
});

export { RadioButton, RadioButton1 };
