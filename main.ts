//Registros y comandos 
const WRITE_DATA = 0x00;
const READ_DATA = 0x0f;
const MCP_INCREMENTO = 0x04;
const MCP_DECREMENTO = 0x08;

namespace grovemcp4131{

    //Pin CS de la microbit para comunicación spi   
    const CSPIN = DigitalPin.P16;

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

        init(){
            this.set(this.val)

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

        setVoltaje(voltaje:number){
            
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