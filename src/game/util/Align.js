import { config as cfg } from "../main";

export class Align
{
	static scaleToGameW(obj,per)
	{
		obj.displayWidth=cfg.scale.width*per;
		obj.scaleY=obj.scaleX;
	}
	static centerH(obj)
	{
		obj.x=cfg.scale.width/2-obj.displayWidth/2;
	}
	static centerV(obj)
	{
		obj.y=cfg.scale.height/2-obj.displayHeight/2;
	}
	static center2(obj)
	{
		obj.x=cfg.scale.width/2-obj.displayWidth/2;
		obj.y=cfg.scale.height/2-obj.displayHeight/2;
	}
	static center(obj)
	{
		obj.x=cfg.scale.width/2;
		obj.y=cfg.scale.height/2;
	}
}