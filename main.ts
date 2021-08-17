/**
 * User Buttons for TT Controller Players.
 */
//%
enum GamerBitPin {
    //% block="red"
    P15 = DAL.MICROBIT_ID_IO_P15,
    //% block="green"
    P13 = DAL.MICROBIT_ID_IO_P13,
    //% block="blue"
    P16 = DAL.MICROBIT_ID_IO_P16,
    //% block="yellow"
    P14 = DAL.MICROBIT_ID_IO_P14,

    //% block="joystick"
    P8 = DAL.MICROBIT_ID_IO_P8,
}

/**
 * Trigger Button Events Proposed by TT Controller Players.
 */
//%
enum GamerBitEvent {
    //% block="pressed"
    Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
    //% block="released"
    Up = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="click"
    Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
}

/**
 * Trigger Joystick Events Proposed by TT Controller Players.
 */
//%
enum JoystickEvent {
    //% block="↖"
    North_West = DAL.MES_DPAD_BUTTON_A_DOWN,
    //% block="↑"
    North = DAL.MES_DPAD_BUTTON_1_DOWN,
    //% block="↗"
    North_East = DAL.MES_DPAD_BUTTON_D_DOWN,

    
    //% block="←"
    West = DAL.MES_DPAD_BUTTON_2_DOWN,
    //% block="●"
    Centre = DAL.MES_DPAD_BUTTON_C_UP,
    //% block="→"
    East = DAL.MES_DPAD_BUTTON_4_DOWN,

    
    //% block="↙"
    South_West = DAL.MES_DPAD_BUTTON_B_DOWN,
    //% block="↓"
    South = DAL.MES_DPAD_BUTTON_3_DOWN,
    //% block="↘"
    South_East = DAL.MES_DPAD_BUTTON_C_DOWN,
}

/**
 * Functions for TT Controller Players.
 */
//% weight=10 color=#DF6721 icon="\uf11b" block="TT Controller"
//% groups='["Joystick & Buttons", "Vibrator"]'
namespace controller {
    let PIN_INIT = 0;
    
    let p1 = 0
    let p2 = 0
    
    let JOY_STATE = 0
    let JOY_INIT = 0

    let wait_time = 50000
    
    basic.forever(function () {
        if (JOY_INIT == 1) {
            p1 = pins.analogReadPin(AnalogPin.P1)
            p2 = pins.analogReadPin(AnalogPin.P2)

            if (p2 > 683) {
                if (p1 > 683 && JOY_STATE != 3) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_D_DOWN
                    )
                    JOY_STATE = 3
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 2) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_1_DOWN
                    )
                    JOY_STATE = 2
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 1) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_A_DOWN
                    )
                    JOY_STATE = 1
                    control.waitMicros(wait_time)
                }
            } else if (p2 > 344) {
                if (p1 > 683 && JOY_STATE != 6) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_4_DOWN
                    )
                    JOY_STATE = 6
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 5) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_C_UP
                    )
                    JOY_STATE = 5
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 4) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_2_DOWN
                    )
                    JOY_STATE = 4
                    control.waitMicros(wait_time)
                }
            } else {
                if (p1 > 683 && JOY_STATE != 9) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_C_DOWN
                    )
                    JOY_STATE = 9
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 8) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_3_DOWN
                    )
                    JOY_STATE = 8
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 7) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_B_DOWN
                    )
                    JOY_STATE = 7
                    control.waitMicros(wait_time)
                }
            }
        }
    })

    export enum Vibrator { 
        //% blockId="V0" block="Off"
        V0 = 0,
        //% blockId="V1" block="On"
        V1 = 255,     
    }
        
    //% shim=controller::init
    function init(): void {
        return;
    }

    function PinInit(): void {        
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);        
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);

        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        PIN_INIT = 1;
        return;
    }

    function JoyInit(): void {
        JOY_INIT = 1;
        return;
    }

    /**
     * To scan a button whether be triggered : return '1' if pressed; return'0' if not.
     */
    //% group=Joystick & Buttons
    //% weight=98
    //% blockId=controller_keyState block="|%button|button is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=4
    export function keyState(button: GamerBitPin): boolean {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = false;
        if (0 == pins.digitalReadPin(<number>button)) {
            num = true;
        }
        return num;
    }

    /**
     * Registers code to run when a TT Controller Button Event is detected.
     */
    //% group=Joystick & Buttons
    //% weight=100
    //% blockGap=50
    //% blockId=controller_onEvent block="on|%button|button is|%event|"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=4
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=3
    export function onEvent(button: GamerBitPin, event: GamerBitEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        control.onEvent(<number>button, <number>event, handler); // register handler
    }
    
    /**
     * Registers code to run when a TT Controller Joystick Event is detected.
     */
    //% group=Joystick & Buttons
    //% weight=99
    //% blockGap=50
    //% blockId=controller_onJoystickEvent block="on joystick is|%event|"
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=3
    export function onJoystickEvent(event: JoystickEvent, handler: Action) {
        init();
        if (!JOY_INIT) { 
            JoyInit();
        }
        control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, <number>event, handler); // register handler
    }

    /**
     * Vibrating motor switch.
     */
    //% group=Vibrator
    //% weight=99
    //% blockId=controller_vibratorMotor block="Vibrator motor switch|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor speed setting, adjustable range 0~255.
     */
    //% group=Vibrator
    //% weight=100
    //% blockGap=50
    //% blockId=controller_vibratorMotorSpeed block="Vibrator motor intensity|%degree|"
    //% degree.min=0 degree.max=255
    export function vibratorMotorSpeed(degree: number): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = degree * 4;
        pins.analogWritePin(AnalogPin.P12, <number>num);
        return;
    }
}
