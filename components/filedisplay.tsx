/**
 * Header.tsx
 * Header
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-20
 */

import { FaFile, FaFileAlt, FaRegFile, FaFileImage } from "react-icons/fa";
import { useRouter } from "next/router";
import { loadEnvConfig } from "next/dist/lib/load-env-config";

import config from '../res/config.json';
import { downloadFile } from "../scripts/display.script";

interface Props {
	data: any;
}

const FileDisplay: React.FunctionComponent<any> =
	(props) => { 

	const data = props.data;
	
	const router = useRouter();

	const humanFileSize = (bytes, si)  => {
		var thresh = si ? 1000 : 1024;
		if(Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si
			? ['KB','MB','GB','TB','PB','EB','ZB','YB']
			: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1)+' '+units[u];
	};

	let image = false;
	if(data.type.includes("jpeg") || data.type.includes("png") || data.type.includes("gif") || data.type.includes("webp") || data.type.includes("jpg") || data.type.includes("svg") || data.type.includes("apng")){
		image = true;
	}

	const copyFunc = (e: any) => {
		e.target.select();
		document.execCommand("copy");
	}

	const dlFunc = (event) => {
		downloadFile(event, data, props.authorization);
	}

	console.log(data);
	

	return (
		<div className="container">
			<div>
				<div>
						{
							image ? <FaFileImage /> : <FaRegFile />
						} {data.filename} 
				</div>
				<div className="file-display">
					<div>
						<div className='img-container'>
							{
								image && !data.protected ? 
								<img src={config.api+'/api/file/download/'+data.file_id} /> : null
							}
						</div>
						
						<table>
							<tbody>
								<tr>
									<th>
										size
									</th>
									<td>
										<code> 
											{humanFileSize(data.bytes, true)}
										</code>
									</td>
								</tr>
								<tr>
									<th>
										upload date
									</th>
									<td>
										<code> 
											{new Date(data.uploaded).toDateString()}
										</code>
									</td>
								</tr>
								<tr>
									<th>
										uploaded by
									</th>
									<td>
										<code>
											{data.owner ? data.owner : <span className="color-orange"> anonymous user </span>}
										</code>
									</td>
								</tr>
							</tbody>
						</table>

						<label>
							direct link
						<input type="text" className="full-width text-center" value={config.api_file+'/download/'+data.file_id} onClick={copyFunc} readOnly />
						</label>

					</div>
					<div>
						<a onClick={dlFunc}>
							<button className="outline" >
								download
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FileDisplay;