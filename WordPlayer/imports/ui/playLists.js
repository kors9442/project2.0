import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Playlists } from '../api/play_lists.js';
import List from './list.js';


const st = {maxWidth: 400, margin: '0 auto 10px'};
const blok= {margin: '15px'};

export default class PlayLists extends Component{

    constructor(props){
        super(props);
        this.state ={
            count: Playlists.find().count(),
            list: null,
        }
    }

    goBack(){
        FlowRouter.go('/');
    }

    updateData = (value) => {
        this.setState({ count: Playlists.find().count()});
    };

    updatePlaylist = (value) =>{
        this.setState({ list: value});
        this.props.updateCurrentList(value);
    };

    goCreateNewList(event){
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        if(text.length) {
            let name = Playlists.find({word: text}).fetch();

            if (name.length == 0){
                Meteor.call('playlists.insert', text);
                ReactDOM.findDOMNode(this.refs.textInput).value = '';
                this.setState({count: this.state.count + 1});
            }
            else{
                alert('That name is already in use!');
            }

        }
    }


    render() {
    if(!this.props.renderWords) {
        return (
            <div style = {blok}>
            <div style={st}>
                <Form inline style ={st}>
                    <FormGroup controlId="formInlineName">
                        <FormControl type="text" placeholder="Enter playlist name" ref = "textInput"/>
                    {' '}

                    <Button
                        type = "submit"
                        onClick={
                            this.goCreateNewList.bind(this)
                        }>
                        <strong><i>Create</i></strong></Button>
                    </FormGroup>
                </Form>
                <div style ={st}>
                    {Playlists.find().fetch().map((list) => (
                    <div style ={st}>
                        <List key={list._id} list={list}
                              updatePlaylist={this.updatePlaylist}
                              updateData={this.updateData}
                        />
                    </div>
                ))}
                </div>

                <Button bsStyle="primary" onClick={this.goBack}><strong><i>Main</i></strong></Button>
            </div>
            </div>
        );
    }
    else{
        return(<div>

        </div>)
    }
    }
}
