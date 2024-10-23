//Registros y comandos 
const WRITE_DATA = 0x00;
const READ_DATA = 0x0f;
const MCP_INCREMENTO = 0x04;
const MCP_DECREMENTO = 0x08;


/**
 * Funciones para operar el modulo
*/
//%weight=10 block="MCP4131 potentiometer"
namespace grovemcp4131{
    

    //Pin CS de la microbit para comunicación spi   
    const CSPIN = DigitalPin.P16;
    /**
    * Create Grove - MCP4131
    */
    //% blockId=grove_mcp_create block="Create MCP4131"

    export function createMCP(): MCP4131
    {
        let mcp = new MCP4131();

        mcp.init();

        return mcp

    }

    export class MCP4131
    {   
        private val: number;

        constructor() {
            this.val = 64
        }
        
        /**
         * Init Grove - MCP4131
         */
        //% blockId=grove_mcp_init block="%mcp|Init Grove - MCP4131"
        init(): Boolean {
            this.set(this.val)
            return true
        }

        set(value:number){
            this.val = value
            if (value > 128)
                value = 128;
            if (value < 0)
                value = 0;
            
            pins.digitalWritePin(CSPIN, 0)

            pins.spiWrite(WRITE_DATA)
            pins.spiWrite(value)

            pins.digitalWritePin(CSPIN, 1)     
        }

        //% blockID=grove_mcp_setvoltage block="%mcp|Ajustar Voltaje a %voltaje"
        //% voltage.min=0 voltage.max=12 
        //% blockSetVariable=res2
        //% blockGap=8
        setVoltaje(voltage:number): number{
            
            let res2 = 1800 * ((voltage/1.25)-1)

            let res2Write = Math.round((res2*100000) / 128)

            pins.digitalWritePin(CSPIN, 0)

            pins.spiWrite(WRITE_DATA)
            pins.spiWrite(res2Write)

            pins.digitalWritePin(CSPIN, 1)

            return res2Write
        }

        incremento(): number {
            pins.digitalWritePin(CSPIN, 0)
            pins.spiWrite(MCP_INCREMENTO)
            pins.digitalWritePin(CSPIN,1)
            this.val += 1
            if (this.val > 128)
                this.val = 128

            return this.val
        }

        decremento(): number{
            pins.digitalWritePin(CSPIN, 0)
            pins.spiWrite(MCP_INCREMENTO)
            pins.digitalWritePin(CSPIN, 1)

            this.val -= 1
            if (this.val < 0)
                this.val = 0

            return this.val
        }

    }
}