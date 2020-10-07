import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { saveVideo, getVideos, getVideo, deleteVideo, manipulateVideo } from '../api/myActivity';

const calculatePercent = (value, total) => Math.round(value / total *100)

/*const onChange= (e)=>{
    if (e.target.name==="description") {
        setdescription(e.target.value)
    }
}*/

export default class FileUpload extends React.Component{
    state = {
        file: null,
        percent: 0,
        loading: false,
        submitted: false,
        videos: [],
        name: '',
        descritpion: '',
    }

    
    handleChange = (event) => {
        console.log("FileUpload.handleChange event.target.files", event.target.files)
  
        this.setState({file: event.target.files[0], submitted: false})
        
    }

    async componentDidMount() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await getVideos(user.id);
            const videos = [];
            for (let i = 0; i < res.data.length; i++) {
                const vid = await getVideo(res.data[i].video_id);
                
                videos.push({
                    video: vid.data.url,
                    name: res.data[i].name,
                    description: res.data[i].description,
                    id: res.data[i].id,
                });
            }
            console.log(videos);
            this.setState((prevState) => ({
                ...prevState,
                videos,
            }))
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.setState({loading: true, submitted: true})

        
        const data = new FormData()
        data.append('files', this.state.file) 

        const manipulateRes = await manipulateVideo(data);
        console.log(manipulateRes);

        const upload_res = await axios({
            method: 'POST',
            url: 'http://localhost:1337/upload',
            data,
            onUploadProgress: (progress) => this.setState({percent: calculatePercent(progress.loaded, progress.total)}) //console.log("FileUpload.handleSubmit onUploadProgress progress", progress)
        })


        this.setState({loading: false, submitted: false})

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await saveVideo({
                video_id: upload_res.data[0].id + '',
                name: this.state.name,
                description: this.state.description,
                user: user.id,
            })
        } catch (error) {
            console.log(error);
        }
    }

    onChangeInput = (e) => {

        const key = e.target.name;
        const value = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    onClickDelete = async (id) => {
        try {
            const res = await deleteVideo(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        const {percent, loading, submitted, videos, file} = this.state

        return(
            <div>
                <div className="FileUpload">
                    <form className="form-container" onSubmit={this.handleSubmit}>
                        <p className="video-choose-text">Choose your video: </p>
                        {
                            file
                            ? <video width="320" height="240" controls>
                            <source src={window.URL.createObjectURL(file)}  type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        : null
                        }
                        <input className="fileUploader" onChange = {this.handleChange} type="file" />
                        <label className="form-description"  htmlFor="description">Name:
                            <input type="text" onChange={(e) => this.onChangeInput(e)} name="name" >
                
                            </input>
                        </label>
                        <label className="form-description"  htmlFor="description">Description:
                            <input type="text" onChange={(e) => this.onChangeInput(e)} name="description" >
                
                            </input>
                        </label>
                        
                        <label><button type='submit'> Submit </button>
                        </label>
                    </form>
                {submitted &&
                <div className= "Progress">
                    <div className="Progress_Seek" style={{width: `${percent}%`}}></div>
                </div>}
                {loading &&
                    <p>Uploading...</p>
                    }
                
                </div>
                <div className="images-container">
                {
                    videos.map((item, index) => {
                        console.log(item);
                        return (
                            <div key={index * 10} className="video-container">
                                <p onClick={() => this.onClickDelete(item.id)} className="delete-btn">Delete</p>
                                <video className="video-item" key={index} width="600" height="400" controls>
                                    <source src={`http://localhost:1337${item.video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-descr">
                                    <p>Name: {item.name}</p>
                                    <p>Description: {item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                
            </div>
            
            
        )

    }
}