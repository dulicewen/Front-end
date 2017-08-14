module.exports = {
    'type' : 'compositor',
    'nodes' : [
        {
            'name': 'source',
            'type': 'texture',
            'outputs': {
                'color': {}
            }
        },

        {
            'name': 'source_half',
            'shader': '#source(qtek.compositor.downsample)',
            'inputs': {
                'texture': 'source'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * dpr, height * dpr] )'
            }
        },

        {
            'name': 'source_quad',
            'shader': '#source(qtek.compositor.downsample)',
            'inputs': {
                'texture': 'source_half'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 4)',
                        'height': 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },


        {
            'name' : 'bright_quad',
            'shader' : '#source(qtek.compositor.bright)',
            'inputs' : {
                'texture' : 'source_quad'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'threshold': 3,
                'scale': 4,
                'textureSize': 'expr([width * dpr / 4, height * dpr / 4])'
            },
            'defines': {
                'ANTI_FLICKER': null
            }
        },

        {
            'name' : 'bright2',
            'shader' : '#source(qtek.compositor.bright)',
            'inputs' : {
                'texture': 'source_quad'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'threshold': 8,
                'scale': 0.01
            }
        },

        {
            'name': 'bright_downsample_8',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_quad'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 8)',
                        'height' : 'expr(height * dpr / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * dpr / 4, height * dpr / 4] )'
            }
        },
        {
            'name': 'bright_downsample_16',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_downsample_8'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 16)',
                        'height' : 'expr(height * dpr / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * dpr / 8, height * dpr / 8] )'
            }
        },
        {
            'name': 'bright_downsample_32',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_downsample_16'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 32)',
                        'height' : 'expr(height * dpr / 32)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * dpr / 16, height * dpr / 16] )'
            }
        },


        {
            'name' : 'bright_upsample_16_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_32'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 16)',
                        'height' : 'expr(height * dpr / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * dpr / 32, height * dpr / 32] )'
            }
        },
        {
            'name' : 'bright_upsample_16_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_16_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 16)',
                        'height' : 'expr(height * dpr / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * dpr / 32, height * dpr / 32] )'
            }
        },



        {
            'name' : 'bright_upsample_8_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_16'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 8)',
                        'height' : 'expr(height * dpr / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * dpr / 16, height * dpr / 16] )'
            }
        },
        {
            'name' : 'bright_upsample_8_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_8_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 8)',
                        'height' : 'expr(height * dpr / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * dpr / 16, height * dpr / 16] )'
            }
        },
        {
            'name' : 'bright_upsample_8_blend',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_8_blur_v',
                'texture2' : 'bright_upsample_16_blur_v'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 8)',
                        'height' : 'expr(height * dpr / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },


        {
            'name' : 'bright_upsample_4_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_8'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * dpr / 8, height * dpr / 8] )'
            }
        },
        {
            'name' : 'bright_upsample_4_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_4_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * dpr / 8, height * dpr / 8] )'
            }
        },
        {
            'name' : 'bloom_composite',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_4_blur_v',
                'texture2' : 'bright_upsample_8_blend'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },

        {
            'name': 'coc',
            'shader': '#source(qtek.compositor.dof.coc)',
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width)',
                        'height': 'expr(height)'
                    }
                }
            }
        },

        {
            'name': 'coc_half',
            'shader': '#source(qtek.compositor.dof.min_coc)',
            'inputs': {
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr, height * dpr] )'
            }
        },

        {
            'name': 'dof_source_half',
            'shader': '#source(qtek.compositor.dof.downsample)',
            'inputs': {
                'texture': 'source',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr, height * dpr] )'
            }
        },

        {
            'name': 'dof_far_blur_hexangonal_1',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_1)',
            'inputs': {
                'texture': 'dof_source_half',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },
        {
            'name': 'dof_far_blur_hexangonal_2',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_2)',
            'inputs': {
                'texture': 'dof_source_half',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },
        {
            'name': 'dof_far_blur_hexangonal_3',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_3)',
            'inputs': {
                'texture1': 'dof_far_blur_hexangonal_1',
                'texture2': 'dof_far_blur_hexangonal_2',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },

        {
            'name': 'dof_near_blur_hexangonal_1',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_1)',
            'inputs': {
                'texture': 'dof_source_half',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_NEARFIELD': null
            }
        },
        {
            'name': 'dof_near_blur_hexangonal_2',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_2)',
            'inputs': {
                'texture': 'dof_source_half',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_NEARFIELD': null
            }
        },
        {
            'name': 'dof_near_blur_hexangonal_3',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_3)',
            'inputs': {
                'texture1': 'dof_near_blur_hexangonal_1',
                'texture2': 'dof_near_blur_hexangonal_2',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_NEARFIELD': null
            }
        },


        {
            'name': 'dof_coc_blur_hexangonal_1',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_1)',
            'inputs': {
                'texture': 'coc_half'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_COC': null
            }
        },
        {
            'name': 'dof_coc_blur_hexangonal_2',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_2)',
            'inputs': {
                'texture': 'coc_half'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_COC': null
            }
        },
        {
            'name': 'dof_coc_blur_hexangonal_3',
            'shader': '#source(qtek.compositor.dof.hexagonal_blur_3)',
            'inputs': {
                'texture1': 'dof_coc_blur_hexangonal_1',
                'texture2': 'dof_coc_blur_hexangonal_2'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * dpr / 2)',
                        'height': 'expr(height * dpr / 2)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            },
            'defines': {
                'BLUR_COC': null
            }
        },

        {
            'name': 'dof_far_blur_upsample',
            'shader': '#source(qtek.compositor.dof.upsample)',
            'inputs': {
                'texture': 'dof_far_blur_hexangonal_3',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width)',
                        'height': 'expr(height)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },

        {
            'name': 'dof_near_blur_upsample',
            'shader': '#source(qtek.compositor.dof.upsample)',
            'inputs': {
                'texture': 'dof_near_blur_hexangonal_3',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width)',
                        'height': 'expr(height)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },

        {
            'name': 'dof_coc_blur_upsample',
            'shader': '#source(qtek.compositor.dof.coc_upsample)',
            'inputs': {
                'coc': 'dof_coc_blur_hexangonal_3'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width)',
                        'height': 'expr(height)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * dpr / 2, height * dpr / 2] )'
            }
        },

        {
            'name': 'dof_composite',
            'shader': '#source(qtek.compositor.dof.composite)',
            'inputs': {
                'original': 'source',
                'blurred': 'dof_far_blur_upsample',
                'nearfield': 'dof_near_blur_upsample',
                'coc': 'coc',
                'nearcoc': 'dof_coc_blur_upsample'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width)',
                        'height': 'expr(height)',
                        'type': 'HALF_FLOAT'
                    }
                }
            }
        },

        {
            'name' : 'lensflare',
            'shader' : '#source(qtek.compositor.lensflare)',
            'inputs' : {
                'texture' : 'bright2'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize' : 'expr([width * dpr / 4, height * dpr / 4])',
                'lensColor' : '#lenscolor'
            }
        },
        {
            'name' : 'lensflare_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'lensflare'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize' : 'expr([width * dpr / 4, height * dpr / 4])'
            }
        },
        {
            'name' : 'lensflare_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'lensflare_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * dpr / 4)',
                        'height' : 'expr(height * dpr / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize' : 'expr([width * dpr / 4, height * dpr / 4])'
            }
        },
        {
            'name' : 'composite',
            'shader' : '#source(qtek.compositor.hdr.composite)',
            'inputs' : {
                'texture' : 'source',
                'bloom' : 'bloom_composite',
                'lensflare' : 'lensflare_blur_v'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width)',
                        'height' : 'expr(height)'
                    }
                }
            }
        },
        {
            'name' : 'FXAA',
            'shader' : '#source(qtek.compositor.fxaa3)',
            'inputs' : {
                'texture' : 'composite'
            }
        }
    ]
}