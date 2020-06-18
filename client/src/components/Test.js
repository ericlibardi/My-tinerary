import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { uploadImage } from '../store/actions/userActions'

class Test extends Component {
    constructor(props){
        super(props);
        this.state ={
            image: "",
            title: "",
            images: ""
        }
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        
    }
    onChangeImage=event=>{
        this.setState({
            image: event.target.files[0],
            loaded: 0,
        })
    }

    onChangeTitle = e => {
        this.setState({ title: e.target.value });
        };

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData() 
        formData.append('title', this.state.title)
        formData.append('image', this.state.image)
        this.props.uploadImage(formData);

        this.setState({
            title: "",
            image: ""
        })
    }
    
    render() {
        return (
            <div className='form-container'>
                <form encType='multipart/form-data' onSubmit={this.onSubmit}> 
                    <h2>Image Form</h2>
                    <label className='form-label'>Image Title</label>
                    <input 
                    className='form-input'
                    placeholder='Enter Image Title'
                    type='text'
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
                    <label className='form-label'>Choose an Image</label>
                    <input type='file'
                    className='form-input'
                    onChange={this.onChangeImage} />
                    <button type='submit' className='submit-btn'>Submit!</button>
                </form>
            </div>
        )
    }
}


Test.propTypes = {
    images: PropTypes.array.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    images: state.user.items
})

export default  connect(mapStateToProps, { uploadImage })(Test)