import React, { Component } from 'react';
import {Menu, Grid, Dropdown, Button, Container} from 'semantic-ui-react'

class StatSideBar extends Component {
    render(){
        return (
            <Container
                style={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                top: 50, //it should be height of header
                bottom: 0,
                width: 265,
                background: "#FFFFFF",
                overflowX: "hidden",
                flex: 1
                }}
            >
                <Container style={{ flex: 1, overflowY: "scroll" }}>
                <Menu vertical compact fluid size = 'huge'>
                    <Menu.Item>
                    <Grid columns = 'equal' divided >
                            <Grid.Row >
                                <Button.Group id='tag' basic widths='3'  >
                                <Button id='tag_calendar' align='center' onClick={()=>this.props.changeMode("CALENDAR")}>CAL</Button>
                                <Button id='tag_person' align='center' onClick={()=>this.props.changeMode("PEOPLE")}>PEO</Button>
                                <Button id='tag_category' align='center' onClick={()=>this.props.changeMode("CATEGORY")}>CAT</Button>
                                </Button.Group>
                            </Grid.Row>
                    </Grid>
                    </Menu.Item>
                    <Menu.Item>
                        <Container className="sidabar">
                        { this.props.items }
                        </Container>
                    </Menu.Item>

                </Menu></Container>;
                
            </Container>
          )
    }
}

export default StatSideBar;