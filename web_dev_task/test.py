import sqlvalidator

sql_query = sqlvalidator.parse("select Isnull(Operator,'Total')Operator,
                           
                        CONVERT(VARCHAR, CONVERT(DATETIME, '[%current_date_from%] 00:00:00'), 101) AS Filter_date_From,
                            CONVERT(VARCHAR, CONVERT(DATETIME, '[%current_date_to%] 23:59:59'), 101) AS Filter_date_to,
                            count(Objectid) Batches_Reviewed,
                            sum(Documents_Reviewed) Files_Reviewed,
                            sum(Documents_Kwic_Reviewed) Documents_Reviewed,
                            sum(Total_Imagenes)Total_Images_Reviewed,
                            sum (Batches_Correct) as Batches_Correct,
                            (count(Objectid) - sum (Batches_Correct)) as Batches_Incorrect,
                            sum(documentosCorrectos) Files_Correct,
                            sum(documentosIncorrectos) Files_Incorrect,
                            sum(documentosKwicCorrectos) Documents_Correct,
                            sum(documentosKwicIncorrectos) Documents_Incorrect,
                            --sum(imagenes_correctas)Images_Correct,
                            --(sum(Total_Imagenes)-sum(imagenes_correctas))Images_Incorrect,
                            sum( Fields_Correct)Fields_Correct,
                            sum( Fields_InCorrect)Fields_InCorrect,
                            (CAST(SUM(Batches_Correct) AS Decimal)*100)/count(Objectid) As Batches_Accuracy,
                            (CAST(SUM(documentosCorrectos) AS Decimal)*100)/SUM(Documents_Reviewed) As File_Accuracy ,
                            --(CAST(SUM(documentosCorrectos) AS Decimal)*100)/SUM(Documents_Reviewed) As Document_Accuracy ,
                            (CAST(SUM(documentosKwicCorrectos) AS Decimal)*100)/SUM(Documents_Kwic_Reviewed) As Document_Accuracy ,
                            (CAST(SUM(Fields_Correct) AS Decimal)*100)/(SUM(Fields_Correct)+sum(Fields_InCorrect)) As Field_Accuracy,
                            (CAST(SUM(imagenes_correctas) AS Decimal)*100)/SUM(Total_Imagenes) As Image_Accuracy
                            from(
                            select
                                Operator,
                                Objectid,
                                sum (Documents_Reviewed) Documents_Reviewed,
                                sum (Documents_Kwic_Reviewed) Documents_Kwic_Reviewed,
                                sum (Total_Imagenes)Total_Imagenes,
                                sum(Documents_Correct) documentosCorrectos,
                                sum(Documents_Incorrect) documentosIncorrectos,
                                sum(documentosKwicCorrectos) documentosKwicCorrectos,
                                sum(documentosKwicIncorrectos) documentosKwicIncorrectos,
                                sum(Imagenes_Correctas) Imagenes_Correctas,
                                case when sum(Documents_Incorrect)=0 then 1 else 0 end as Batches_Correct,
                                sum(  Fields_Correct)Fields_Correct,
                            sum( Fields_InCorrect)Fields_InCorrect
                                from(
                                    select
                                    Operator,
                                    Object_id Objectid,
                                    count (distinct doc_reference_id) Documents_Reviewed,
                                    count (doc_id+doctype_code_id) Documents_Kwic_Reviewed,
                                    sum (Total_Imagenes)Total_Imagenes,
                                    sum(Documentos_Kwic_Correctos) documentosKwicCorrectos,
                                    sum(Documentos_Kwic_Incorrectos) documentosKwicIncorrectos,
                                    sum(Imagenes_Correctas) Imagenes_Correctas,
                                    case when sum(Documentos_Kwic_incorrectos)=0 then 1 else 0 end as Documents_Correct,
                                    case when sum(Documentos_Kwic_incorrectos)>0 then 1 else 0 end as Documents_Incorrect,
                                    sum( distinct  Fields_Correct)Fields_Correct,
                            sum( distinct Fields_InCorrect)Fields_InCorrect
                                    from
                                    (
                            select  Distinct
                            Operator,
                            object_id,
                            doc_id,
                            doctype_code_id,
                            doc_reference_id,
                            count(image_id)Total_Imagenes,
                            sum(Imagen_Correcta)Imagenes_Correctas,
                            (case when (sum(Imagen_Correcta)= count(image_id) )then 1 else 0 end) Documentos_Kwic_Correctos,
                            (case when (sum(Imagen_Correcta)= count(image_id) )then 0 else 1 end) Documentos_Kwic_Incorrectos,
                            sum(Distinct Fields_Correct)Fields_Correct,
                            sum(Distinct Fields_InCorrect)Fields_InCorrect
                            from
                            (
                        select  Distinct
                            --case when b.val_user = ''  then 'system' else b.val_user end Operator,
                            case when  b.[%QRQueue%]_user = ''  then 'system' else  b.[%QRQueue%]_user end  Operator,
                            b.object_id,
                            ivalqa.image_id,
                            iva.doc_id,
                            iva.doctype_code_id,
                            iva.doc_reference_id,
                            ive.[doctype_mapped],
                            CAST(CASE WHEN(CASE WHEN ive.doctype_mapped <> '' THEN ive.doctype_mapped ELSE iva.doctype_mapped END) = ivalqa.doctype_mapped THEN 1 ELSE 0 END AS int) ImageDocTypeCorrect,
                            CAST(CASE WHEN(CASE WHEN ive.doctype_mapped <> '' THEN ive.doctype_mapped ELSE iva.doctype_mapped END) = ivalqa.doctype_mapped THEN 0 ELSE 1 END AS int) ImageDocTypeIncorrect ,
                            case when (
                                (CASE WHEN(CASE WHEN ive.doctype_mapped <> '' THEN ive.doctype_mapped ELSE iva.doctype_mapped END) = ivalqa.doctype_mapped THEN 1 ELSE 0 END)=1
                            ) then 1 else 0 end as Imagen_Correcta,
                            Fields_Correct,
                            Fields_InCorrect
                            from
                            (
                            select Distinct
                            iqa.object_id,
                            iqa.image_id,
                            iqa.doc_id,
                            iqa.doctype_title,
                            iqa.doctype_code_id,
                            iqa.doctype_mapped,
                            iqa.doc_reference_id,
                                sum(  
                    ImageNO_ESTACIONCorrect
                            ) as Fields_Correct ,
                        sum(
                    ImageNO_ESTACIONIncorrect
                        ) as Fields_InCorrect
                            from
                            (
                            select Distinct
                            --case when b.val_user = ''  then 'system' else b.val_user end
                        case when  b.[%QRQueue%]_user = ''  then 'system' else  b.[%QRQueue%]_user end  Operator,
                            b.object_id,
                            iqa.doc_reference_id,
                            i.image_id,
                            i.image_order,
                        CAST(CASE WHEN(CASE WHEN ive.NO_ESTACION <> '' THEN ive.NO_ESTACION ELSE iva.NO_ESTACION END) = iqa.NO_ESTACION THEN 1 ELSE 0 END AS int) ImageNO_ESTACIONCorrect,
                                CAST(CASE WHEN(CASE WHEN ive.NO_ESTACION <> '' THEN ive.NO_ESTACION ELSE iva.NO_ESTACION END) = iqa.NO_ESTACION THEN 0 ELSE 1 END AS int) ImageNO_ESTACIONIncorrect,
                                case when (
                                CAST(CASE WHEN(CASE WHEN ive.NO_ESTACION <> '' THEN ive.NO_ESTACION ELSE iva.NO_ESTACION END) = iqa.NO_ESTACION THEN 0 ELSE 1 END AS int)     = 0
                                ) then 1 else 0 end as Imagen_Correcta
                               
                            FROM [dbo].batches b
                            --Files
                                INNER JOIN [dbo].document_custom_data_qa iqa ON b.object_id = iqa.object_id
                        INNER JOIN [dbo].[image_structure_data_qa] i (nolock) on iqa.doc_reference_id = i.doc_reference_id and i.image_order = 1
                        LEFT JOIN [dbo].document_custom_data_[%QRQueue%] iva ON b.object_id = iva.object_id AND iqa.doc_reference_id = iva.doc_reference_id--and iqa.image_id = iva.image_id
                        LEFT JOIN [dbo].document_custom_data_[%QRQueue%] ive ON b.object_id = ive.object_id AND iqa.doc_reference_id = ive.doc_reference_id--and iqa.image_id = ive.image_id
                        --Page
                            --LEFT JOIN [dbo].image_custom_data_qa iqa_img ON b.object_id  = iqa_img.object_id AND iqa.doc_reference_id = iqa_img.doc_reference_id  AND iqa_img.image_id = i.image_id
                            --LEFT JOIN [dbo].image_custom_data_[%QRQueue%]  iva_img ON b.object_id = iva_img.object_id AND iqa_img.doc_reference_id = iva_img.doc_reference_id AND iqa_img.image_id = iva_img.image_id --and iqa_img.image_order = iva_img.image_order
                            --LEFT JOIN [dbo].image_custom_data_[%QRQueue%]  ive_img ON b.object_id = ive_img.object_id AND iqa_img.doc_reference_id = ive_img.doc_reference_id AND iqa_img.image_id = ive_img.image_id --and iqa_img.image_order = ive_img.image_order
                   
                            ,  
                            (  
                            select  
                                '[%current_date_from%] 00:00:00.000' as current_date_froms ,
                                '[%current_date_to%] 23:59:59.999' as current_date_tos ,
                                '[%current_date_from%] 00:00:00.000'  as current_date_fromts  ,
                                '[%current_date_to%] 23:59:59.999' as current_date_tots
                            )   as    QueryParameters  
                            WHERE (b.process = 'INSACK' OR (b.process = 'REL' AND b.status ='CMP')) and
                            b.available =1
                            and ([%DateType%] between CONVERT(datetime,'[%current_date_from%] 00:00:00.000',101) and CONVERT(datetime,'[%current_date_to%] 23:59:59.999',101))
                            ) as ival
       
                            RIGHT JOIN [dbo].image_structure_data_qa iqa ON iqa.object_id = ival.object_id AND iqa.doc_reference_id = ival.doc_reference_id
                            and iqa.image_id = ival.image_id and iqa.image_order = 1
                            INNER JOIN [dbo].batches b ON iqa.object_id = b.object_id --and b.batch_reference_id = iqa.doc_reference_id
                            ,  
                            (  
                            select  
                            '[%current_date_from%] 00:00:00.000' as current_date_froms ,
                                '[%current_date_to%] 23:59:59.999' as current_date_tos ,
                                '[%current_date_from%] 00:00:00.000'  as current_date_fromts  ,
                                '[%current_date_to%] 23:59:59.999' as current_date_tots
                            )   as    QueryParameters
                            WHERE
                            (b.process = 'INSACK' OR (b.process = 'REL' AND b.status ='CMP')) And
                            b.available =1
                            AND ([%DateType%] between CONVERT(datetime,'[%current_date_from%] 00:00:00.000',101) and CONVERT(datetime,'[%current_date_to%] 23:59:59.999',101))
                            group by
                            iqa.object_id,
                            iqa.image_id,
                            iqa.doc_id,
                            iqa.doctype_title,
                            iqa.doctype_code_id,
                            iqa.doctype_mapped,
                            iqa.doc_reference_id
                            ) as ivalqa
                            LEFT JOIN [dbo].image_structure_data_[%QRQueue%]   iva ON ivalqa.object_id = iva.object_id AND ivalqa.doc_reference_id = iva.doc_reference_id and ivalqa.image_id = iva.image_id
                            LEFT JOIN [dbo].image_structure_data_[%QRQueue%]   ive ON ivalqa.object_id = ive.object_id AND ivalqa.doc_reference_id = ive.doc_reference_id and ivalqa.image_id = ive.image_id
                            INNER JOIN [dbo].batches b ON ivalqa.object_id = b.object_id
                            where(b.process = 'INSACK' OR (b.process = 'REL' AND b.status ='CMP'))And
                            b.available =1
                            AND ([%DateType%] between CONVERT(datetime,'[%current_date_from%] 00:00:00.000',101) and CONVERT(datetime,'[%current_date_to%] 23:59:59.999',101))
                            ) ImagenesFields
                            group by Operator,object_id,doc_id,doctype_code_id,doc_reference_id
                            ) DocumentosKwic
                                    group by Operator,Object_ID,doc_reference_id
                                )Documentos
                                group by Operator,Objectid
                                    )Batches
                            group by rollup (Operator);
 ")

if not sql_query.is_valid():
    print(sql_query.errors)